// mongodb://aldy120:53U8bRoOrNVnO4N0@cluster0-shard-00-00-hyjpb.mongodb.net:27017,cluster0-shard-00-01-hyjpb.mongodb.net:27017,cluster0-shard-00-02-hyjpb.mongodb.net:27017/profile?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin
var MongoClient = require('mongodb').MongoClient,
  co = require('co'),
  assert = require('assert');
var uri = 'mongodb://aldy120:53U8bRoOrNVnO4N0@cluster0-shard-00-00-hyjpb.mongodb.net:27017,cluster0-shard-00-01-hyjpb.mongodb.net:27017,cluster0-shard-00-02-hyjpb.mongodb.net:27017/profile?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
var collectionName = 'basic';


function insertOne(document) {
  co(function* () {
    // Connection URL
    var db = yield MongoClient.connect(uri);
    console.log("Connected correctly to server");

    // Insert a single document
    var r = yield db.collection(collectionName).insertOne(document);
    assert.equal(1, r.insertedCount);
    console.log('Inserted');
    // Close connection
    db.close();
  }).catch(function (err) {
    console.log(err.stack);
  });
}

// { a: 1 }, { $set: { b: 1 } }
function updateOne(filter, instruction) {
  co(function* () {
    // Connection URL
    var db = yield MongoClient.connect(uri);
    console.log("Connected correctly to server");

    // Get the updates collection
    var col = db.collection(collectionName);

    // Update a single document
    var r = yield col.updateOne(filter, instruction);
    // assert.equal(1, r.matchedCount);
    // assert.equal(1, r.modifiedCount);
    console.log('Updated');
    db.close();
  }).catch(function (err) {
    console.log(err.stack);
  });
}

function deleteOne(filter) {
  co(function* () {
    // Connection URL
    var db = yield MongoClient.connect(uri);
    console.log("Connected correctly to server");

    // Get the removes collection
    var col = db.collection(collectionName);

    // Remove a single document
    var r = yield col.deleteOne(filter);
    assert.equal(1, r.deletedCount);
    console.log('deleted');
    db.close();
  }).catch(function (err) {
    console.log(err.stack);
  });
}

function findAll() {
  return co(function* () {
    // Connection URL
    var db = yield MongoClient.connect(uri);
    console.log("Connected correctly to server");

    // Get the collection
    var col = db.collection(collectionName);

    // Get first two documents that match the query
    var docs = yield col.find({}).toArray();
    var result = yield Promise.resolve(docs);
    console.log('found');
    db.close();
    return result;
  })
}
//

module.exports = {
  insertOne,
  updateOne,
  deleteOne,
  findAll
};