import 'dotenv/config';
import { Knex } from 'knex';
import { knexSnakeCaseMappers } from 'objection';

module.exports = {
  development: {
    client: 'pg',
    debug: !!+process.env.DB_DEBUG,
    connection: {
      host: 'localhost',
      port: '5432',
      database: 'md.zaid',
      user: 'md.zaid',

      charset: 'utf8',
    },
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10,
    },
    seeds: {
      directory: './database/seeds',
    },
    ...knexSnakeCaseMappers(),
  },
} as Knex.Config;
