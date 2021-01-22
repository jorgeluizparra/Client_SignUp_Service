const { validationResult } = require("express-validator");
const db = require("../models");
const Client = db.client;
const Dependent = db.dependent;

// Retrieve all clients
exports.getAll = (req, res) => {

    Client.findAll({ include: Dependent })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                msg: "Ocorreu algum erro ao tentar buscar os cadastros."
            })
        })
    
};

// Add a new client
exports.create = (req, res) => {

    const schemaErrors = validationResult(req);

    if(!schemaErrors.isEmpty()){
        return res.status(403).send(schemaErrors.array())
    }

    const newClient = req.body;

    Client.create(newClient, { include: [ Dependent ] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: "Ocorreu um erro ao tentar cadastrar o novo cliente."
            });
        });
};

// Update the client data
exports.update = (req, res) => {

    const schemaErrors = validationResult(req);

    if(!schemaErrors.isEmpty()){
        return res.status(403).send(schemaErrors.array())
    }

    const id = req.params.id;
    const updatedClientData = req.body;

    Client.update(updatedClientData, { where: { id : id } })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    msg: 'Dados do client atualizados com sucesso.',
                    data: updatedClientData
                })
            } else {
                res.status(404).send({
                    msg: 'Não foi possivel atualizar os dados do client.'
                })
            }
        })
        .catch(err => {
            res.status(400).send({
                msg: 'Erro ao tentar atualizar os dados do client.'
            });
        })
};

// Delete a client register
exports.delete = (req, res) => {

    const schemaErrors = validationResult(req);

    if(!schemaErrors.isEmpty()){
        return res.status(403).send(schemaErrors.array())
    }

    const id = req.params.id;

    Client.destroy({where: { id: id }})
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    id: id,
                    msg: 'Cadastro do cliente deletado com sucesso.'
                });
            } else {
                res.status(404).send({
                    msg: 'Cadastro do cliente não foi encontrado.'
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                msg: 'Erro ao tentar deletar o cadastro.'
            });
        });
};
