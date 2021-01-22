module.exports = app => {
    var router = require("express").Router();
    const dependent = require("../controllers/dependent.controller.js");

    const { checkSchema } = require('express-validator');
  
    var router = require("express").Router();

    // Add new dependent route
    router.post("/:clientId", checkSchema({
        clientId: {
            in: ['params'],
            isInt: true,
            toInt: true,
            errorMessage: 'O id do cliente inválido.',
        },
        name: {
            in: ['body'],
            isString: true,
            toLowerCase: true,
            notEmpty: true,
            errorMessage: 'Nome inválido.'
        },
        age: {
            in: ['body'],
            isInt: true,
            toInt: true,
            notEmpty: true,
            errorMessage: 'Idade inválida.'
        },
        relation: {
            in: ['body'],
            isString: true,
            toLowerCase: true,
            notEmpty: true,
            errorMessage: 'Relação inválida.'
        }
    }), dependent.create);

    // Delete a dependent route
    router.delete("/:id", checkSchema({
        id: {
            in: ['params'],
            isInt: true,
            toInt: true,
            errorMessage: 'O id esta inválido.',
        }
    }), dependent.delete);
  
    app.use('/api/v1/dependents', router);
};