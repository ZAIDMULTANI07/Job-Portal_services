const Knex = require('knex');

const {
  onUpdateTrigger,
  ON_UPDATE_TIMESTAMP_FUNCTION,
  timestamps,
} = require('./../utils/helper');

exports.up = async function (knex) {
  await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
  const migration = await knex.schema.createTable('jobs', (table) => {
    table.bigIncrements('id');
    table.string('ulid').index();
    table.string('title');
    table.text('description');
    table.biginteger('user_id');
    timestamps(knex, table);
  });
  await knex.raw(onUpdateTrigger('jobs'));
  return migration;
};

exports.down = async function (knex) {
  const migrations = await knex.schema.dropTableIfExists('jobs');
  return migrations;
};
