const { validationResult } = require("express-validator");
const db = require("../models");
const Dependent = db.dependent;

// Add new dependent
exports.create = (req, res) => {

    const schemaErrors = validationResult(req);

    if(!schemaErrors.isEmpty()){
        return res.status(403).send(schemaErrors.array())
    }

    const clientId = req.params.clientId;
    const newDependent = req.body;

    newDependent.clientId = clientId;

    Dependent.create(newDependent)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(400).send({
                message: "Ocorreu um erro ao tentar cadastrar um novo dependente."
            });
        });
};

// Delete a dependent
exports.delete = (req, res) => {

    const id = req.params.id;

    Dependent.destroy( { where: { id: id } } )
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    id: id,
                    msg: 'Dependente deletado com sucesso.'
                });
            } else {
                res.status(404).send({
                    msg: 'Dependente não foi encontrado.'
                });
            }
        })
        .catch(err => {
            res.status(400).send({
                msg: 'Erro ao tentar deletar o dependente.'
            });
        });
};
