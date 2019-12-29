const express = require('express');
const EnergyProvidersService = require('../../3. core/business/energy-providers.service');
const EnergyProvidersRepository = require('../../2. infrastructure/persistence/repositories/energy-providers.repository');

const batteriesController = express.Router();

batteriesController.route('/definitions/:id').patch(function (req, res) {
    runOnService(async service => {
        const result = await service.promoteDefinition(req.params.id, req.body.pricePerUnit);
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
    const service = new EnergyProvidersService(new EnergyProvidersRepository());
    callback(service);
} 

module.exports = batteriesController;