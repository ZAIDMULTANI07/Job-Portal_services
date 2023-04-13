exports.timestamps = function (knex, table) {
  table
    .timestamp('created_at', { useTz: false, precision: 0 })
    .notNullable()
    .defaultTo(knex.raw('now()::timestamp'));

  table
    .timestamp('updated_at', { useTz: false, precision: 0 })
    .notNullable()
    .defaultTo(knex.raw('now()::timestamp'));
};

exports.onUpdateTrigger = (table) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `;

exports.ON_UPDATE_TIMESTAMP_FUNCTION = `
    CREATE OR REPLACE FUNCTION on_update_timestamp()
    RETURNS trigger AS $$
    BEGIN
      NEW."updated_at" = now()::timestamp;
      RETURN NEW;
    END;
  $$ language 'plpgsql';
  `;
