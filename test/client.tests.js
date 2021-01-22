// Set test enviroment
process.env.NODE_ENV = 'test';

const db = require("../app/models");
const Client = db.client;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
let assert = chai.assert;

chai.use(chaiHttp);

describe('Client', () => {
    beforeEach((done) => {
        Client.destroy({
            where: {},
            truncate: false    
        })
        .then(res => {
            done();
        })
        .catch(err => {
            console.log(err);
            done();
        });
    });

    // GET TEST
    describe('GET', () => {
        it('It should get all clients', (done) => {
            chai.request(server)
                .get('/api/v1/clients')
                .end((err, res) => {
                    assert.equal(res.status, 200, "Status different to 200.")
                    assert.isArray(res.body, "Body is not an array.")
                    done();
                })
        });
    });
});
