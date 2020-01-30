const express = require('express');
const BatteriesService = require('../../3. core/business/batteries.service');
const BatteriesRepository = require('../../2. infrastructure/persistence/repositories/batteries.repository');
const MessageBus = require('../../../../kernel/messaging/bus');
const config = require('../config');

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

batteriesController.route('/catalog/:id/price').patch(function (req, res) {
    runOnService(async service => {
        const result = await service.changePrice(req.params.id, req.body.price);
        res.status(result.httpCode(200)).json(result.toPlain());
    });
});

batteriesController.route('/catalog/:id/stock').patch(function (req, res) {
    runOnService(async service => {
        const result = await service.changeStock(req.params.id, req.body.stock);
        res.status(result.httpCode(200)).json(result.toPlain());
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
    const service = new BatteriesService(new BatteriesRepository(), new MessageBus(config));
    callback(service);
} 

module.exports = batteriesController;