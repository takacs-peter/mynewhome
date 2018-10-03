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
        schemas.salesman.remove({}, (err) => {
            done();
        });
    });
    /*
      * Test the /GET route
      */
    describe('/GET Salesman', () => {
        it('it should GET all the salesmen', (done) => {
            chai.request(server)
                .get('/api/salesman')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/GET:ID Salesman', () => {
        it('it should GET one existing salesmen', (done) => {
            let Salesman = new schemas.salesman({
                name: "Old Name",
                email: "test@mail.com",
                phone: "(+36) 70 324-5355"
            })
            Salesman.save((err, salesman) => {
                chai.request(server)
                    .get('/api/salesman/' + salesman.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property("_id").eql(salesman.id);
                        res.body.should.have.property("email").eql("test@mail.com");
                        done();
                    });
            });
        })
        it('it should not GET an invalid salesmen', (done) => {
            let Salesman = new schemas.salesman({
                name: "Old Name",
                email: "updated@mail.com",
                phone: "(+36) 70 324-5355"
            })
            Salesman.save((err, salesman) => {
                chai.request(server)
                    .get('/api/salesman/' + '1')
                    .end((err, res) => {
                        res.should.have.status(404);
                        res.body.message.should.be.eql('Salesman with the given ID not found');
                        done();
                    });
            });
        })
    })

    describe('/POST salesman', () => {
        it('it should not POST an invalid salesman', (done) => {
            let salesman = {
                name: "Sales Man",
            }
            chai.request(server)
                .post('/api/salesman')
                .send(salesman)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
        it('it should POST a valid salesman', (done) => {
            let salesman = {
                name: "Sales Man",
                phone: "+3680234656",
                email: 'asdf@sdfgsdt.com'
            }
            chai.request(server)
                .post('/api/salesman')
                .send(salesman)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('email');
                    res.body.should.have.property('phone');
                    done();
                });
        });

        // it('it should delete')
    })

    describe('/PUT salesman', () => {
        it('it should not PUT an invalid salesman', (done) => {
            let Salesman = new schemas.salesman({
                name: "Old Name",
                email: "updated@mail.com",
                phone: "(+36) 70 324-5355"
            })
            Salesman.save((err, salesman) => {
                chai.request(server)
                    .put('/api/salesman/' + salesman.id)
                    .send({
                        name: "Updated Name",
                        phone: "sdfs"
                    })
                    .end((err, res) => {
                        res.should.have.status(400)
                        done();

                    })
            })
        })

        it('it should PUT a valid salesman', (done) => {
            let Salesman = new schemas.salesman({
                name: "Old Name",
                email: "updated@mail.com",
                phone: "(+36) 70 324-5355"
            })
            Salesman.save((err, salesman) => {
                chai.request(server)
                    .put('/api/salesman/' + salesman.id)
                    .send({
                        name: "Updated Name",
                        email: "updated@mail.com",
                        phone: "(+36) 70 324-5355"
                    })
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        res.body.should.have.property('name').eql("Updated Name");
                        res.body.should.have.property('phone').eql('(+36) 70 324-5355');
                        res.body.should.have.property('email').eql("updated@mail.com");
                        done();
                    })

            })
        })
    })

    describe('/DELETE/:id salesman', () => {
        it('it should DELETE a salesman given the id', (done) => {
            let salesman = new schemas.salesman({
                name: "To Be Deleted",
                email: "todelete@mail.com",
                phone: "(+36) 70 324-5355"
            })
            salesman.save((err, salesman) => {
                chai.request(server)
                    .delete('/api/salesman/' + salesman.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Salesman successfully deleted!');
                        done();
                    });
            });
        });

        it('it should not DELETE a salesman given an invalid ID', (done) => {
            let salesman = new schemas.salesman({
                name: "Updated Name",
                email: "updated@mail.com",
                phone: "(+36) 70 324-5355"
            })
            salesman.save((err, salesman) => {
                chai.request(server)
                    .delete('/api/salesman/' + '23')
                    .end((err, res) => {
                        res.should.have.status(404);
                        done();
                    });
            });
        });
    });
})