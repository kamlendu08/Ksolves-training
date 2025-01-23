
const { Client } = require("pg");
const client = new Client({
  user: 'postgres',
  password: 'Kamlendu@240905',
  host: 'localhost',
  port: '5432',
  database: 'db1',
});
client
  .connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });
