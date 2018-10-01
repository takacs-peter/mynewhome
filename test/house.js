process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let schemas = require('../schemas');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('..');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Schemas', () => {
    beforeEach((done) => { //Before each test we empty the database
        schemas.house.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET House', () => {
        it('it should GET all the houses', (done) => {
            chai.request(server)
                .get('/api/house/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST house', () => {
        it('it should not POST an invalid house', (done) => {
            let house = {
                name: false,
                price: "sdfglkdsgék,t"
            }
            chai.request(server)
                .post('/api/house/')
                .send(house)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should POST a valid house', (done) => {
            let house = {
                name: "Flat 130",
                price: 24000000,
                description: "Egy lakás",
                type: "kicsi",
                area: 74,
                floor: "4",
                balcony_size: 10,
                rooms: "2+fél",
                real_size: 70,
                completion: "2017.12.01",
                heating: "padlófűtés",
                //photos: Buffer,
            }
            chai.request(server)
                .post('/api/house/')
                .send(house)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('price');
                    res.body.should.have.property('description');
                    res.body.should.have.property('building');
                    done();
                });
        });

    })

    describe('/PUT house', () => {
        it('it should not PUT an invalid house', (done) => {
            let House = new schemas.house({
                name: "Flat 130",
                price: 24000000,
                description: "Egy lakás",
                type: "kicsi",
                area: 74,
                floor: "4",
                balcony_size: 10,
                rooms: "2+fél",
                real_size: 70,
                completion: "2017.12.01",
                heating: "padlófűtés",
                //photos: Buffer,
            })
            House.save((err, house) => {
                chai.request(server)
                    .put('/api/house/' + house.id)
                    .send({
                        name: "House Name",
                        area: "sdfs"
                    })
                    .end((err, res) => {
                        res.should.have.status(400)
                        done();
                    })
            })
        })

        it('it should PUT a valid house', (done) => {
            let House = new schemas.house({
                name: "Flat 130",
                price: 24000000,
                description: "Egy lakás",
                type: "kicsi",
                area: 74,
                floor: "4",
                balcony_size: 10,
                rooms: "2+fél",
                real_size: 70,
                completion: "2017.12.01",
                heating: "padlófűtés",
                //photos: Buffer,
            })
            House.save((err, house) => {
                chai.request(server)
                    .put('/api/house/' + house.id)
                    .send({
                        area: 90
                    })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('area').eql(90);
                        done();
                    })

            })
        })
    })

    describe('/DELETE/:id house', () => {
        it('it should DELETE a house given the id', (done) => {
            let house = new schemas.house({
                name: "Flat 130",
                price: 24000000,
                description: "Egy lakás",
                type: "kicsi",
                area: 74,
                floor: "4",
                balcony_size: 10,
                rooms: "2+fél",
                real_size: 70,
                completion: "2017.12.01",
                heating: "padlófűtés",
                //photos: Buffer,
            })
            house.save((err, house) => {
                chai.request(server)
                    .delete('/api/house/' + house.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('House successfully deleted!');
                        done();
                    });
            });
        });

        it('it should not DELETE a house given an invalid ID', (done) => {
            let house = new schemas.house({
                name: "Updated Name",
                email: "updated@mail.com",
                phone: "(+36) 70 324-5355"
            })
            house.save((err, house) => {
                chai.request(server)
                    .delete('/api/house/' + '23')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
        });
    });
})