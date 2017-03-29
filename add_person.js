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

const firstName = process.argv[2];
const lastName = process.argv[3];
const birthday = process.argv[4];

knex('famous_people').insert({'first_name': firstName, 'last_name': lastName, 'birthdate': birthday})
  // .returning()
  .then( function (result) {
      console.log(result)
       });

console.log(knex.select().from('famous_people').rows);
