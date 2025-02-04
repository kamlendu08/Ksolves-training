// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: "localhost",
      user: 'postgres',
      password: 'Kamlendu@240905',
      port: '5432',
      database: 'blog',
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'blog',
      user: 'postgres',
      password: 'Kamlendu@240905'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'users'
    }
  }

};

