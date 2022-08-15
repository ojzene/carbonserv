process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
import { Track } from "../models/track";

import chai from 'chai';
import chaiHttp from 'chai-http';

let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

const API = 'https://carbonserv.herokuapp.com/';
// const API = 'http://localhost:3001';

describe('Tracks', () => {
    describe('/POST/:packageId track', () => {
        it('it should not POST tracking with invalid packageId', (done) => {
              chai.request(API)
              .post('/tracking/BUn2GcGo')
              .send()
              .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Package is invalid or doesn't exist");
                done();
              });
        });
    });
    describe('/GET track', () => {
        it('it should GET all the tracking', (done) => {
            chai.request(API)
                .get('/tracking')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    /*
    * Test the /PATCH route
    */
    describe('/PATCH/:packageId/:trackingId track', () => {
        it('it should PATCH a track with correct packageId and trackingId field', (done) => {
            let track = {
                trackingStatus: "IN_TRANSIT"
            }
            Track.findOne({status: track.trackingStatus}, (err, tracking) => {
                chai.request(API)
                    .patch('/tracking/MzUR5td2/JZ5iMGApDo')
                    .send(track)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('trackingStatus');
                        res.body.should.have.property('message').eql('Status successfully updated');
                        done();
                    });
            })
        });
        it('it should PATCH a track with correct packageId and trackingId field', (done) => {
            let track = {
                trackingStatus: "WAREHOUSE"
            }
            Track.findOne({status: track.trackingStatus}, (err, tracking) => {
                chai.request(API)
                    .patch('/tracking/MzUR5td2/JZ5iMGApDo')
                    .send(track)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('trackingStatus');
                        res.body.should.have.property('message').eql('Status successfully updated');
                        done();
                    });
            })
        });
        it('it should not PATCH a track if trackingStatus is PICKED_UP', (done) => {
            let track = {
                trackingStatus: "PICKED_UP"
            }
            chai.request(API)
                .patch('/tracking/MzUR5td2/JZ5iMGApDo')
                .send(track)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql("Package pick up cannot be done more than once");
                    done();
                });
        });
    });
});