'use strict'
var ObjectId = require('mongodb').ObjectID;
var db = require('../helpers/db')('education');
var validateMongoId = require('../helpers/validateMongoId');

function findAllEducation(req, res) {
  var pid = req.swagger.params.pid.value;
  db.findAll({pid}).then(result => {
    result.length ? res.json(result) : res.status(204).json();
  });
}
function insertOneEducation(req, res) {
  var document = req.swagger.params.body.value;
  db.insertOne(document).then(result => res.json(result.ops[0]));
}
function findOneEducation(req, res) {
  var _id = req.swagger.params.id.value;
  _id = new ObjectId(_id);
  db.findAll({_id}).then(result => result ? res.json(result[0]) : res.status(404).json());
}
function updateOneEducation(req, res) {
  var _id = req.swagger.params.id.value;
  _id = new ObjectId(_id);
  var instruction = {
    $set: req.swagger.params.body.value
  }
  db.updateOne({_id}, instruction)
    .then(result => result.value ? res.json(result.value) : res.status(404).json());
}
function removeOneEducation(req, res) {
  var _id = new ObjectId(req.swagger.params.id.value);
  db.deleteOne({_id}).then(result => result ? res.json(result) : res.json());
}
module.exports = {
  findAllEducation,
  insertOneEducation,
  findOneEducation,
  updateOneEducation,
  removeOneEducation
}