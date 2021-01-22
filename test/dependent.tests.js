// Set test enviroment
process.env.NODE_ENV = 'test';

const db = require("../app/models");
const Dependent = db.dependent;

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
let assert = chai.assert;

chai.use(chaiHttp);

describe('Dependent', () => {
    beforeEach((done) => {
        Dependent.destroy({
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
    
});
