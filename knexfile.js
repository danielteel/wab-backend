// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev/db.db3'
    },
    seeds: {
      directory: './seeds/'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'mysql',
    connection: {
      host:     process.env.WAB_HOST,
      port:     process.env.WAB_PORT,
      database: process.env.WAB_DB,
      user:     process.env.WAB_USER,
      password: process.env.WAB_PASS
    },
    pool: {min: 2, max: 10},
    seeds: {
      directory: './seeds/'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
