const args = process.argv[2];
var knex = require('knex');
const settings = require("./settings");

var knex = require('knex')({
  client: 'pg',
  connection: {
    host     : settings.host,
    user     : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex.select().from('famous_people')
  .where('first_name', args)
  .asCallback(function(err, rows) {
    if (err) return console.error(err);
    console.log(rows);
  });