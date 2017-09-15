// mongodb://aldy120:53U8bRoOrNVnO4N0@cluster0-shard-00-00-hyjpb.mongodb.net:27017,cluster0-shard-00-01-hyjpb.mongodb.net:27017,cluster0-shard-00-02-hyjpb.mongodb.net:27017/profile?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin
var MongoClient = require('mongodb').MongoClient,
  co = require('co'),
  assert = require('assert'),
  Logger = require('mongodb').Logger;
var uri = 'mongodb://aldy120:53U8bRoOrNVnO4N0@cluster0-shard-00-00-hyjpb.mongodb.net:27017,cluster0-shard-00-01-hyjpb.mongodb.net:27017,cluster0-shard-00-02-hyjpb.mongodb.net:27017/profile?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
var db;

// wrapper
function db(collectionName) {
  function insertOne(document) {
    return co(function* () {
      // Connection URL    
      var db = yield MongoClient.connect(uri);
      
      // Insert a single document
      var r = yield db.collection(collectionName).insertOne(document);
      assert.equal(1, r.insertedCount);
      // document._id = r.insertedId;
      
      // Close connection
      db.close();
      var result = yield Promise.resolve(r);
      return result;
    }).catch(function (err) {
      console.log(err.stack);
    });
  }
  // { a: 1 }, { $set: { b: 1 } }
  function updateOne(filter, instruction) {
    return co(function* () {
      
      // Connection URL    
      var db = yield MongoClient.connect(uri);
  
      // Get the updates collection
      var col = db.collection(collectionName);
  
      // Update a single document
      var r = yield col.findOneAndUpdate(filter, instruction, {returnOriginal:false});
      db.close();
      var result = yield Promise.resolve(r);
      return result;
    }).catch(function (err) {
      console.log(err.stack);
    });
  }
  function deleteOne(filter) {
    return co(function* () {
     
      // Connection URL
      var db = yield MongoClient.connect(uri);
  
      // Get the removes collection
      var col = db.collection(collectionName);
  
      // Remove a single document
      var r = yield col.findOneAndDelete(filter);
      // assert.equal(1, r.deletedCount);
      db.close();
      var result = yield Promise.resolve(r.value);
      return result;
    }).catch(function (err) {
      console.log(err.stack);
    });
  }
  function findAll(filter) {
    return co(function* () {
     
      // Connection URL
      var db = yield MongoClient.connect(uri);
  
      // Get the collection
      var col = db.collection(collectionName);
  
      // Get first two documents that match the query
      var docs = yield col.find(filter).toArray();
      var result = yield Promise.resolve(docs);
      db.close();
      return result;
    })
  }
  return {
    insertOne,
    updateOne,
    deleteOne,
    findAll
  }
}

module.exports = db;