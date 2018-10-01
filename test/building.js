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
        schemas.building.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET Building', () => {
        it('it should GET all the buildings', (done) => {
            chai.request(server)
                .get('/api/building/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST building', () => {
        it('it should not POST an invalid building', (done) => {
            const building = {
                name: false,
                construction_start: "asdfgsarg"
            }
            chai.request(server)
                .post('/api/building/')
                .send(building)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('it should POST a valid building', (done) => {
            const building = {
                name: "Test Building",
                city: "Budapest",
                sales: null,
                sold: false,
                construction_start: "2000.01.01",
                construction_end: "2005.05.05",
                description: "Pleasant building downtown",
                techdata: ["a", "b", "c"],
                //photos: Buffer,
            }
            chai.request(server)
                .post('/api/building/')
                .send(building)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('name');
                    res.body.should.have.property('city');
                    res.body.should.have.property('description');
                    res.body.should.have.property('construction_end');
                    done();
                });
        });

    })

    describe('/PUT building', () => {
        it('it should not PUT an invalid building', (done) => {
            let Building = new schemas.building({
                name: "Test Building",
                city: "Budapest",
                sales: null,
                sold: false,
                construction_start: "2000.01.01",
                construction_end: "2005.05.05",
                description: "Pleasant building downtown",
                techdata: ["a", "b", "c"],
                //photos: Buffer,
            })
            Building.save((err, building) => {
                chai.request(server)
                    .put('/api/building/' + building.id)
                    .send({
                        name: "Building Name",
                        sold: 3
                    })
                    .end((err, res) => {
                        res.should.have.status(400)
                        done();
                    })
            })
        })

        it('it should PUT a valid building', (done) => {
            const Building = new schemas.building({
                name: "Test Building",
                city: "Budapest",
                sales: null,
                sold: false,
                construction_start: "2000.01.01",
                construction_end: "2005.05.05",
                description: "Pleasant building downtown",
                techdata: ["a", "b", "c"],
                //photos: Buffer,
            })
            Building.save((err, building) => {
                chai.request(server)
                    .put('/api/building/' + building.id)
                    .send({
                        sold: true
                    })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('sold').eql(true);
                        done();
                    })

            })
        })
    })

    describe('/DELETE/:id building', () => {
        it('it should DELETE a building given the id', (done) => {
            let building = new schemas.building({
                name: "Test Building",
                city: "Budapest",
                sales: null,
                sold: false,
                construction_start: "2000.01.01",
                construction_end: "2005.05.05",
                description: "Pleasant building downtown",
                techdata: ["a", "b", "c"],
                //photos: Buffer,
            })
            building.save((err, building) => {
                chai.request(server)
                    .delete('/api/building/' + building.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Building successfully deleted!');
                        done();
                    });
            });
        });

        it('it should not DELETE a building given an invalid ID', (done) => {
            let building = new schemas.building({
                name: "Updated Name",
                email: "updated@mail.com",
                phone: "(+36) 70 324-5355"
            })
            building.save((err, building) => {
                chai.request(server)
                    .delete('/api/building/' + '23')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
        });
    });
})