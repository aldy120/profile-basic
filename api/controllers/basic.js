'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */

// 記得喔這邊很雷要小心
module.exports = {
  findAll,
  insertOne,
  updateOne,
  deleteOne,
  findOne,
  test
};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
var ObjectID = require('mongodb').ObjectID
var db = require('../helpers/db');
function findAll(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  db.findAll().then(result => res.json(result));
}

function insertOne(req, res) {
  var document = req.swagger.params.body.value;
  db.insertOne(document);
  res.json({message: 'Success'});
}

function updateOne(req, res) {
  // var body = req.swagger.params.body.value;
  // var filter = body.filter;
  // filter._id = new ObjectID(filter._id);
  // var updated = body.updated;
  // var instruction = {
  //   $set: updated
  // }
  // db.updateOne(filter, instruction);
  var filter = {};
  filter._id = new ObjectID(req.swagger.params.id.value);
  console.log('get id');
  var updated = req.swagger.params.body.value;
  var instruction = {
    $set: updated
  }
  db.updateOne(filter, instruction);
  res.json({message: 'Success'});
}

function deleteOne(req, res) {
  var filter = {};
  filter._id = new ObjectID(req.swagger.params.id.value);
  db.deleteOne(filter);
  res.json({message: 'success'})
}

function findOne(req, res) { }


function test(req, res) {
  res.json({message: 'test'})
}