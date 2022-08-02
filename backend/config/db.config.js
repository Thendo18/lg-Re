// const dotenv = require("dotenv");
// dotenv.config()
// const { Sequelize } = require('sequelize')

// const sequelizeConnection = new Sequelize( process.env.DATABASE_URL, {
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// } );

// sequelizeConnection
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });
// // try {
// //     sequelizeConnection.authenticate();
// //     console.log('Connection has been established successfully.');
// // } catch (error) {
// //     console.error('Unable to connect to the database:', error);
// // }

// module.exports = sequelizeConnection



const Pool = require("pg").Pool;

const pool = new Pool({ connectionString: process.env.DATABASE_URL,
 ssl:{rejectUnauthorized:false} })

module.exports = pool;



// const pool = (() => {
//     if (process.env.NODE_ENV !== 'production') {
//         return new Pool({
//             connectionString: process.env.DATABASE_URL,
//             ssl: false
//         });
//     } else {
//         return new Pool({
//             connectionString: process.env.DATABASE_URL,
//             ssl: {
//                 rejectUnauthorized: false
//               }
//         });
//     } })();