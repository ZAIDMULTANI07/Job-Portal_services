const Knex = require('knex');
const {
  onUpdateTrigger,
  ON_UPDATE_TIMESTAMP_FUNCTION,
  timestamps,
} = require('./../utils/helper');

exports.up = async function (knex) {
  await knex.raw(ON_UPDATE_TIMESTAMP_FUNCTION);
  const migration = await knex.schema.createTable('users', function (table) {
    table.bigIncrements('id');
    table.string('ulid').index();
    table.string('name');
    table.string('email');
    table.string('password');
    table.integer('role');
    timestamps(knex, table);
  });
  await knex.raw(onUpdateTrigger('users'));
  return migration;
};

exports.down = async function down(knex) {
  const migration = await knex.schema.dropTableIfExists('users');
  return migration;
};
