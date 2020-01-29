const express = require('express');
const AccumulatorsService = require('../../3. core/business/accumulators.service');
const AccumulatorsRepository = require('../../2. infrastructure/persistence/repositories/accumulators.repository');

const accumulatorsController = express.Router();

accumulatorsController.route('/definitions').get(function (req, res) {
    runOnService(async service => {
        const result = await service.getDefinitions();
        res.status(200).json(result);
    });
});

accumulatorsController.route('/catalog').get(function (req, res) {
    runOnService(async service => {
        const result = await service.getCatalog();
        res.status(200).json(result);
    });
});

accumulatorsController.route('/definitions/:id').patch(function (req, res) {
    runOnService(async service => {
        const result = await service.promoteDefinition(req.params.id, req.body.stock, req.body.price);
        res.status(result.httpCode(200)).json(result.toPlain());
    });
});

accumulatorsController.route('/definitions/:id').delete(function (req, res) {
    runOnService(async service => {
        const result = await service.deleteDefinition(req.params.id);
        res.status(result.httpCode(204)).json(result.toPlain());
    });
});

function runOnService(callback) {
    const service = new AccumulatorsService(new AccumulatorsRepository());
    callback(service);
} 

module.exports = accumulatorsController;