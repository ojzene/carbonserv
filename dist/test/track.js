"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
const track_1 = require("../models/track");
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
let server = require('../index');
let should = chai_1.default.should();
chai_1.default.use(chai_http_1.default);
const API = 'http://localhost:3001';
describe('Tracks', () => {
    // beforeEach((done) => {
    //     Track.deleteMany({}, (err) => { 
    //        done();         
    //     });        
    // });
    describe('/POST/:packageId track', () => {
        it('it should not POST tracking with invalid packageId', (done) => {
            chai_1.default.request(API)
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
            chai_1.default.request(API)
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
            };
            track_1.Track.findOne({ status: track.trackingStatus }, (err, tracking) => {
                chai_1.default.request(API)
                    .patch('/tracking/BUn2GcRc/l8OycYniDt')
                    .send(track)
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('trackingStatus');
                    res.body.should.have.property('message').eql('Status successfully updated');
                    done();
                });
            });
        });
        it('it should PATCH a track with correct packageId and trackingId field', (done) => {
            let track = {
                trackingStatus: "WAREHOUSE"
            };
            track_1.Track.findOne({ status: track.trackingStatus }, (err, tracking) => {
                chai_1.default.request(API)
                    .patch('/tracking/BUn2GcRc/l8OycYniDt')
                    .send(track)
                    .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('trackingStatus');
                    res.body.should.have.property('message').eql('Status successfully updated');
                    done();
                });
            });
        });
        it('it should not PATCH a track if trackingStatus is PICKED_UP', (done) => {
            let track = {
                trackingStatus: "PICKED_UP"
            };
            chai_1.default.request(API)
                .patch('/tracking/BUn2GcRc/l8OycYniDt')
                .send(track)
                .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql("Package pick up cannot be done more than once");
                done();
            });
        });
        // it('it should not PATCH a track if trackingStatus has been DELIVERED before', (done) => {
        //     let track = {
        //         trackingStatus: "DELIVERED"
        //     }
        //     Track.findOne({status: track.trackingStatus}, (err, tracking) => {
        //     chai.request(API)
        //         .patch('/tracking/BUn2GcRc/l8OycYniDt')
        //         .send(track)
        //         .end((err, res) => {
        //             res.should.have.status(400);
        //             res.body.should.be.a('object');
        //             // res.body.should.have.property('status').eql(tracking.status);
        //             res.body.should.have.property('message').eql('Package has already been delivered');
        //             done();
        //         });
        //     })
        // });
    });
});
