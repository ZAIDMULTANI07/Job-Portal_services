const Knex = require('knex');
const {
  onUpdateTrigger,
  ON_UPDATE_TIMESTAMP_FUNCTION,
  timestamps,
} = require('./../utils/helper');

exports.up = async function (knex) {
  await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
  const migration = await knex.schema.createTable(
    'applications',
    function (table) {
      table.bigIncrements('id');
      table.string('ulid').index();
      table.biginteger('user_id');
      table.bigInteger('job_id');
      timestamps(knex, table);
    },
  );
  await knex.raw(onUpdateTrigger('applications'));
  return migration;
};

exports.down = async function (knex) {
  const migration = await knex.schema.dropTableIfExists('applications');
  return migration;
};
