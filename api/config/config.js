require('dotenv').config();

module.exports = {
  development: {
    database: 'tododev',
    use_env_variable: 'DB_DEV_URL',
    dialect: 'postgres',
  },
};
