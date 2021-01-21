const { validationResult } = require("express-validator");
const db = require("../models");
const Client = db.client;
const Dependent = db.dependent;

// Create new Client
exports.create = (req, res) => {

    const schemaErrors = validationResult(req);

    if(!schemaErrors.isEmpty()){
        return res.status(403).send(schemaErrors.array())
    }

    const register = {
        name: req.body.name,
        email: req.body.email,
        studentNumber: req.body.studentNumber,
        cpf: req.body.cpf,
    };

    Client.create(register)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: "Ocorreu um erro ao tentar salvar o cadastro."
            });
        });
};

// Retrieve all Clients
exports.getAll = (req, res) => {

    Client.findAll({ include: Dependent })
        .then(data => {
            const response = functions.getPageData(data, page, limit, search);
            res.send(response)
        })
        .catch(err => {
            res.status(400).send({
                msg: "Ocorreu algum erro ao tentar buscar os cadastros."
            })
        })
    
};

// Update a Client Data
exports.update = (req, res) => {

    const schemaErrors = validationResult(req);

    if(!schemaErrors.isEmpty()){
        return res.status(403).send(schemaErrors.array())
    }

    const id = req.params.id;

    const name = req.body.name;
    const email = req.body.email;

    const updateFields = {};

    if (email && name) {
        updateFields.name = name;
        updateFields.email = email;
    } else if (email && !name) {
        updateFields.email =email;
    } else if (name && !email) {
        updateFields.name =name;
    } else {
        return res.status(400).send("Todos os campos estavam em branco.")
    }

    Client.update(updateFields, { 
        where: { id : id }
    })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    msg: 'Cadastro atualizado com sucesso.',
                    data: updateFields
                })
            } else {
                res.status(400).send({
                    msg: 'Não foi possivel atualizar o cadastro.'
                })
            }
        })
        .catch(err => {
            res.status(400).send({
                msg: 'Erro ao tentar atualizar o cadastro.'
            });
        })
};

// Delete a Register with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Client.destroy({where: { id: id }})
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    id: id,
                    msg: 'Cadastro deletado com sucesso.'
                });
            } else {
                res.status(400).send({
                    msg: 'Cadastro não foi encontrado.'
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                msg: 'Erro ao tentar deletar o cadastro.'
            });
        });
};
