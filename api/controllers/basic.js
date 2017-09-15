'use strict';
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
var db = require('../helpers/db')('basic');
var validateMongoId = require('../helpers/validateMongoId');

function findAll(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  db.findAll({}).then(result => {
    if (!result) {
      res.json([]);
    }
    res.json(result);
  });
}
function findOne(req, res) {
  var id = req.swagger.params.id.value;
  if (!validateMongoId(id)) {
    res.status(400).json({
      message: 'Format error'
    });
    return;
  }
  var filter = {};
  filter._id = new ObjectID(id);
  db.findAll(filter).then(result => {
    if (result.length === 0) {
      res.status(404).json({
        message: 'Not Found'
      });
    } else {
      res.json(result[0]);
    }
  });
}
function insertOne(req, res) {
  var document = req.swagger.params.body.value;
  db.insertOne(document).then(result => res.json(result.ops[0]));
}
function updateOne(req, res) {
  var id = req.swagger.params.id.value;
  if (!validateMongoId(id)) {
    res.status(400).json({
      message: 'Format error'
    });
    return;
  }
  var filter = {};
  filter._id = new ObjectID(id);
  var updated = req.swagger.params.body.value;
  var instruction = {
    $set: updated
  }
  db.updateOne(filter, instruction).then(result => {
    if (!result.value) {
      res.status(404).json({
        message: 'Not found'
      });
      return;
    }
    res.json(result.value);
  });

}
function deleteOne(req, res) {
  var id = req.swagger.params.id.value;
  if (!validateMongoId(id)) {
    res.status(400).json({
      message: 'Format error'
    });
    return;
  }
  var filter = {};
  filter._id = new ObjectID(id);
  db.deleteOne(filter).then(document => {
    document ? res.json(document) : res.json({});
  });
}

function test(req, res) {
  res.json({ message: 'test' })
}
