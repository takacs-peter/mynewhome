process.env.NODE_ENV = 'test';

let schemas = require('../schemas');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('..');
let should = chai.should();
const fetch = require('node-fetch')
let token = "default"

async function setup() {
    await new schemas.defaults({
        salesman: {
            name: 'asdfsfgarsg',
            phone: "+36 60 654363",
            email: "arwef@agrks.com"
        },
        highlighted: null,
        lowprice: [],
        partnerpage: {
            address: "sdf",
            about: "asfsarf",
            email: "eamil@askfmakl.com"
        }
    }).save()
}
setup();


chai.use(chaiHttp);
//Our parent block
describe('Default schema', () => {
    beforeEach((done) => { //Before each test we empty the database
        schemas.salesman.remove({}, (err) => {

        });
        fetch(
            'http://localhost:3000/api/auth/',
            {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({
                    "username": "test@test.com",
                    "password": "12345"
                })
            })
            .then(async (response) => {
                await response.json()
                token = response.headers.get('x-auth-token')
                done();

            })
    });
    /*
      * Test the /GET route
      */
    describe('/GET Defaults', () => {
        it('it should GET the default obejct', (done) => {
            chai.request(server)
                .get('/api/defaults')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.salesman.should.have.property('name');
                    res.body.salesman.should.have.property('email');
                    res.body.salesman.should.have.property('phone');
                    res.body.should.have.property('partnerpage');
                    res.body.should.have.property('lowprice');
                    res.body.should.have.property('highlighted');
                    done();
                });
        });
    });


    describe('/PUT defaults', () => {
        it('it should not PUT an invalid default document', (done) => {
            chai.request(server)
                .put('/api/defaults')
                .set('x-auth-token', token)
                .send({
                    salesman: {
                        name: "Updated Name",
                        phone: "sdfs"
                    }
                })
                .end((err, res) => {
                    res.should.have.status(400)
                    done();
                })
        })

        it('it should POST a valid default', (done) => {
            chai.request(server)
                .put('/api/defaults')
                .set('x-auth-token', token)
                .send({
                    salesman: {
                        name: "Updated Name",
                        email: "updated@mail.com",
                        phone: "(+36) 70 324-5355"
                    }
                })
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('salesman');
                    res.body.should.have.property('highlighted')
                    res.body.should.have.property('lowprice')
                    res.body.should.have.property('partnerpage')
                    done();
                })
        })
    })
})