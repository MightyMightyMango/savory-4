const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    logging: false,
    dialectOptions: {
      require: true,
      rejectUnauthorized: false
    }
  }
)

// const database = process.env.DATABASE_URL || `${databaseName}`

// let db = ''

// if (process.env.DATABASE_URL) {
//   db = new Sequelize(database)
// } else {
//   db = new Sequelize(database, 'postgres', '', {
//     dialect: 'postgres',
//     logging: false,
//     ssl: true,
//     dialectOptions: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   })
// }

module.exports = db

if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
