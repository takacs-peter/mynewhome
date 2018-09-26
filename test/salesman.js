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

    describe('/POST salesman', () => {
        it('it should not POST an invalid salesman', (done) => {
            let salesman = {
                name: "Sales Man",
                year: 1954
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
                    res.body.errors.pages.should.have.property('kind').eql('required');
                    done();
                });
        });
    })
});