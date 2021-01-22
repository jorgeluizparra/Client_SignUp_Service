module.exports = app => {
    var router = require("express").Router();
    const client = require("../controllers/client.controller.js");

    const { checkSchema } = require('express-validator');
  
    var router = require("express").Router();

    // Get all clients
    router.get("/", client.getAll);

    // Add new client
    router.post("/", checkSchema({
        code: {
            in: ['body'],
            isString: true,
            notEmpty: true,
            optional: {
                checkFalsy: true
            },
            isLength: {
                errorMessage: 'Codigo do cliente incorreto, deve conter 8 digítos.',
                options: 8
            },
            errorMessage: 'Codigo do cliente inválido.'
        },
        name: {
            in: ['body'],
            isString: true,
            toLowerCase: true,
            notEmpty: true,
            errorMessage: 'Nome inválido.'
        },
        address: {
            in: ['body'],
            isString: true,
            notEmpty: true,
            errorMessage: 'Endereço inválido.'
        },
        phone: {
            in: ['body'],
            isString: true,
            errorMessage: 'Telefone inválido.',
            isLength: {
                errorMessage: 'Telefone inválido. O telefone deve conter 14 digítos.',
                options: 14
            }
        },
        dependents: {
            in: ['body'],
            isArray: true,
            errorMessage: 'Lista de dependentes inválida. A lista deve ser uma array.'
        }
    }), client.create);

    // Update a client data
    router.put("/:id", checkSchema({
        id: {
            in: ['params'],
            isInt: true,
            toInt: true,
            errorMessage: 'O id inválido.',
        },
        code: {
            in: ['body'],
            isString: true,
            notEmpty: true,
            optional: {
                checkFalsy: true
            },
            isLength: {
                errorMessage: 'Codigo do cliente incorreto, deve conter 8 digítos.',
                options: 8
            },
            errorMessage: 'Codigo do cliente inválido.'
        },
        name: {
            in: ['body'],
            isString: true,
            toLowerCase: true,
            notEmpty: true,
            errorMessage: 'Nome inválido.'
        },
        address: {
            in: ['body'],
            isString: true,
            notEmpty: true,
            errorMessage: 'Endereço inválido.'
        },
        phone: {
            in: ['body'],
            isString: true,
            errorMessage: 'Telefone inválido.',
            isLength: {
                errorMessage: 'Telefone inválido. O telefone deve conter 14 digítos.',
                options: 14
            }
        }
    }), client.update);

    // Delete a client register
    router.delete("/:id", checkSchema({
        id: {
            in: ['params'],
            isInt: true,
            toInt: true,
            errorMessage: 'O id esta inválido.',
        }
    }), client.delete);
  
    app.use('/api/v1/clients', router);
};