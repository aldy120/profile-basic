var should = require('should');
var request = require('supertest');
var server = require('../../../app');
var assert = require('assert');

describe('basic', function () {
  describe('out of bound', function () {
    this.timeout(10000);
    describe('POST /users', function () {
      it('should return 400', function (done) {
        request(server)
          .post('/users')
          .set('Accept', 'application/json')
          .send({ name: 'test_name', create_date: new Date() })
          .expect('Content-Type', /json/)
          .expect(400, done)
      });
    });
    describe('GET /users', function () {
      it('should return 200', function (done) {
        request(server)
          .get('/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done)
      });
    });
  });
  describe('/users/{id}/profile', function () {
    var _id = '000000000000000000000000';
    describe('GET /users/{id}/profile', function () {

      it('should return 404', function (done) {
        this.timeout(10000);
        request(server)
          .get(`/users/${_id}/profile`)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(404, done)
      });
    });
    describe('PUT /users/{id}/profile', function () {
      it('should return 400', function (done) {
        request(server)
          .put(`/users/${_id}/profile`)
          .type('json')
          .send({ name: 'modified_test_name', create_date: '12345678' })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(400, done)
      });
    });
  });
  describe('Mix operation', function () {
    var agent = request.agent(server);
    var _id;
    it('get all', function (done) {

      agent.get('/users')
        .expect(200, done);
    })
    it('post', function (done) {
      var example = {
        user_name: 'hero',
        avatar_file_id: '1',
        avatar_coordinate: '1',
        cover_file_id: '1',
        cover_coordinate: '1',
        complete_status: '1',
        introduction: '1',
        personal_url: '1',
        create_date: '1',
        update_date: '1'
      }
      agent.post('/users')
        .send(example)
        .expect(200)
        .end((err, res) => {
          _id = res.body._id;
          err ? done(err) : done();
        })
    });
    it('put', function (done) {
      var example2 = {
        user_name: 'banana king',
        avatar_file_id: '2',
        avatar_coordinate: '2',
        cover_file_id: '2',
        cover_coordinate: '2',
        complete_status: '2',
        introduction: '2',
        personal_url: '2',
        create_date: '2',
        update_date: '2'
      }
      agent.put(`/users/${_id}/profile`)
        .send(example2)
        .expect(200)
        .end((err, res) => {
          err ? done(err) : done();
        })
    });
    it('get', function(done) {
      agent.get(`/users/${_id}/profile`)
        .expect(200)
        .end((err, res) => {
          res.body.user_name.should.eql('banana king');
          err ? done(err) : done();
        })
    });
    it('delete', function(done) {
      agent.delete(`/users/${_id}/profile`)
        .expect(200)
        .end((err, res) => {
          res.body.user_name.should.eql('banana king');
          err ? done(err) : done();
        })
    });
    it('get all', function(done) {
      agent.get('/users')
        .expect(200, done)
    })
  })
});
