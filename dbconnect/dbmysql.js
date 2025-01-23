
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kamlendu@240905",
  database: "db1",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("mysql connected");
});

module.exports = { connection };
