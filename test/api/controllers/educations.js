var should = require('should');
var request = require('supertest');
var server = require('../../../app');
var assert = require('assert');
describe('education', function() {
  this.timeout(10000);
  var pid = '000000000000000000000000';
  var id = '111111111111111111111111';
  describe('outbound', function() {
    var agent = request.agent(server);
    it('should return 204', function(done) {
      agent.get(`/users/${pid}/profile/educations`)
        .set('Accept', 'application/json')
        .expect(204, done);
    });
    it('should return 400', function(done) {
      agent.get(`/users/zzzzz/profile/educations`)
        .set('Accept', 'application/json')
        .expect(400, done);
    });
    it('should reutrn 400', function(done) {
      agent.post(`/users/${pid}/profile/educations`)
        .set('Accept', 'application/json')
        .send({})
        .expect(400, done);
    });
    it('should return 404', function(done) {
      agent.get(`/users/{pid}/profile/educations/${id}`)
        .set('Accept', 'application/json')
        .expect(404, done);
    });
    
  })
  describe('inbound', function () {
    var agent = request.agent(server);
    var pid = '88888';
    var body = {
      pid: 'new',
      school_name: 'z',
      major_name: 'z',
      degree: 'z',
      edu_location: 'z',
      start_year: 'z',
      start_month: 'z',
      end_year: 'z',
      end_month: 'z',
      status: 'z',
      create_date: 'z',
      update_date: 'z'
    };
    var newBody = {
      pid: 'new123',
      school_name: 'new',
      major_name: 'new',
      degree: 'new',
      edu_location: 'new',
      start_year: 'new',
      start_month: 'new',
      end_year: 'new',
      end_month: 'new',
      status: 'new',
      create_date: 'new',
      update_date: 'new'
    };
    var id;  
    it('POST /users/{pid}/profile/educations', function (done) {
      
      agent.post(`/users/${pid}/profile/educations`)
        .set('Accept', 'application/json')
        .send(body)
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body.pid, body.pid);
          id = res.body._id;
          err ? done(err) : done();
        });
    });
    it('GET /users/{pid}/profile/educations', function(done) {
      agent.get(`/users/${pid}/profile/educations`)
        .set('Accept', 'application/json')
        .expect(200, done)
    });
    it('GET /users/{pid}/profile/educations/{id}', function(done) {
      agent.get(`/users/${pid}/profile/educations/${id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          assert.equal(res.body.pid, body.pid);
          err ? done(err) : done();
        });
    });
    it('PUT /users/{pid}/profile/educations/{id}', function(done) {
      agent.put(`/users/${pid}/profile/educations/${id}`)
        .set('Accept', 'application/json')
        .send(newBody)
        .expect(200)
        .end((err, res) => {
          assert(res.body.pid, newBody.pid);
          err ? done(err) : done();
        });
    });
    it('DELETE /users/{pid}/profile/educations/{id}', function(done) {
      agent.delete(`/users/${pid}/profile/educations/${id}`)
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          assert(res.body.pid, '123');
          err ? done(err) : done();
        })
    })
  })
});
