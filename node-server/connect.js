let mysql = require('mysql');

let config = {
  host: 'localhost',
  user: 'root',
  password: 'welcome@123',
  database: 'eucaas'
};

// let config = {
//   host: '104.215.186.11',
//   user: 'root',
//   password: 'Welcome@123',
//   database: 'eucaas'
// };


module.exports = config;

let connection = mysql.createConnection(config);

connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server...');
});