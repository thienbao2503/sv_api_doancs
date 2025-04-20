const env = process.env.NODE_ENV || 'development'
const dotenv = require('dotenv')
dotenv.config();

module.exports = {
  development: {
    driver: process.env.DIALECT || 'mysql',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
    // driver: 'mysql',
    // host: '128.199.253.91',
    // user: 'admin_yomart',
    // password: 'yomart!@#',
    // database: 'admin_yomart'
  }
}