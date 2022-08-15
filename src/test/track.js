process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Track = require("../models/track");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Tracks', () => {
    beforeEach((done) => {
        Track.remove({}, (err) => { 
           done();           
        });        
    });
  describe('/GET track', () => {
      it('it should GET all the tracking', (done) => {
        chai.request(server)
            .get('/tracking')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });
  /*
  * Test the /PATCH route
  */
  describe('/PATCH track', () => {
      it('it should not PATCH a track without trackingStatus field', (done) => {
          let track = {
            trackingStatus: "IN_TRANSIT"
        }
        chai.request(server)
            .patch('/tracking')
            .send(track)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('trackingStatus');
                  res.body.errors.trackingStatus.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a track ', (done) => {
          let track = {
            trackingStatus: "IN_TRANSIT"
        }
        chai.request(server)
            .post('/tracking')
            .send(track)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('Track successfully updated!');
                  res.body.track.should.have.property('title');
                  res.body.track.should.have.property('author');
                  res.body.track.should.have.property('pages');
                  res.body.track.should.have.property('year');
              done();
            });
      });
  });
});