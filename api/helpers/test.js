var db = require('./db');
db.findAll().then(result => console.log(result));