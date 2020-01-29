const express = require('express');
const BatteriesService = require('../../3. core/business/batteries.service');
const BatteriesRepository = require('../../2. infrastructure/persistence/repositories/batteries.repository');

const batteriesController = express.Router();

batteriesController.route('/definitions').get(function (req, res) {
    runOnService(async service => {
        const result = await service.getDefinitions();
        res.status(200).json(result);
    });
});

batteriesController.route('/catalog').get(function (req, res) {
    runOnService(async service => {
        const result = await service.getCatalog();
        res.status(200).json(result);
    });
});

batteriesController.route('/definitions/:id').patch(function (req, res) {
    runOnService(async service => {
        const result = await service.promoteDefinition(req.params.id, req.body.stock, req.body.price);
        res.status(result.httpCode(200)).json(result.toPlain());
    });
});

batteriesController.route('/definitions/:id').delete(function (req, res) {
    runOnService(async service => {
        const result = await service.deleteDefinition(req.params.id);
        res.status(result.httpCode(204)).json(result.toPlain());
    });
});

function runOnService(callback) {
    const service = new BatteriesService(new BatteriesRepository());
    callback(service);
} 

module.exports = batteriesController;