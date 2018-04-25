var users = require('../app/users.js');
var mysql = require('mysql');
var connection  = mysql.createConnection({
  host            : 'localhost',
  user            : 'jorger',
  password        : 'admin',
  database        : 'usersdb'
});

connection.connect((err) => {

  if(err) throw err;

  console.log('connected!...')

  let createUsers = `create table if not exists users (
    id int primary key auto_increment,
    firstName varchar(50) not null, 
    lastName varchar(50) not null, 
    home varchar(50) not null,
    UNIQUE (firstName, lastName))`;

  connection.query(createUsers, (err, results, fields) => {
    if(err) {
      console.log(err.message)
    }
  })

  for (let index = 0; index < users.data.length; index++) {
    const user = users.data[index];

    if(user.last_name === null) {
      user.last_name = 'none'
    }
    let userValues = [user.first_name, user.last_name, user.home];

    connection.query('INSERT INTO users (firstName, lastName, home) VALUES (?, ?, ?)', userValues, (err, result) => {
      if (err) throw err;
    })
  }

  connection.query('SELECT * FROM usersdb.users', (err, result, fields) => {
    if (err) throw err;
    console.log(result);
  })
})






