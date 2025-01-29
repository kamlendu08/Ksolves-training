//
//
// const { Client } = require("pg");
// const client = new Client({
//   user: 'postgres',
//   password: 'Kamlendu@240905',
//   host: 'localhost',
//   port: '5432',
//   database: 'blog',
// });
// client
//   .connect()
//   .then(() => {
//     console.log('Connected to PostgreSQL database');
//   })
//   .catch((err) => {
//     console.error('Error connecting to PostgreSQL database', err);
//   });
//
// const query = `CREATE TABLE "user" (
//  username VARCHAR(255),
//   email VARCHAR(255),
//  password VARCHAR(255)
// )`
//
// //const q1 = `DROP TABLE "user";`;
//
//
// //async function q() {
// //const res = await client.query(q1);
//
// //}
// //q();
// async function createTableIfNotExists() {
//   const checkTableQuery = `
//     SELECT EXISTS (
//       SELECT 1 FROM information_schema.tables 
//       WHERE table_name = 'user'
//     );
//   `;
//
//   const res = await client.query(checkTableQuery);
//
//   if (!res.rows[0].exists) {
//     const createTableQuery = `
//       CREATE TABLE "user" (
//         id SERIAL PRIMARY KEY,
//         username VARCHAR(255),
//         email VARCHAR(255),
//         password VARCHAR(255)
//       );
//     `;
//
//     await client.query(createTableQuery);
//     console.log("Table 'user' created successfully.");
//   } else {
//     console.log("Table 'user' already exists.");
//   }
// }
//
// createTableIfNotExists();
// module.exports = { client };
//
//
// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: "localhost",
//     user: 'postgres',
//     password: 'Kamlendu@240905',
//     port: '5432',
//     database: 'blog',
//   }
// })

const knex = require('knex');
const { development } = require('./knexfile');
const db = knex(development);
module.exports = db;
