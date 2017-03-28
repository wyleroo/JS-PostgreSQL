const args = process.argv[2];

var pg = require('pg');

var client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect(function (err) {
  if (err) throw err;

  client.query('DROP TABLE IF EXISTS famous_people CASCADE');

  const createTable = client.query('CREATE TABLE famous_people (id BIGSERIAL PRIMARY KEY, first_name VARCHAR(50), last_name VARCHAR(50), birthdate DATE');

  createTable.on('end', () => {
    const insertTable = client.query('INSERT INTO famous_people (first_name, last_name, birthdate) VALUES ('Paul', 'Rudd', '1969-04-06')');
    insertTable.on('end', () => {
      client.query('SELECT * FROM famous_people WHERE first_name=$1', [args], function (err, result) {
      if (err) throw err;
        console.log(result.rows[0]);
        client.end(function (err) {
          if (err) throw err;
        });
      });
    });
  });
});

on('end', () => { client.end(); });


  // client.query('INSERT INTO famous_people (first_name, last_name, birthdate) VALUES ('Abraham', 'Lincoln', '1809-02-12')');

  // client.query('INSERT INTO famous_people (first_name, last_name, birthdate) VALUES ('Mahatma', 'Gandhi', '1869-10-02')');