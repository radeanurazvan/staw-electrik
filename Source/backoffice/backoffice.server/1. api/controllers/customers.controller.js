const express = require('express');
const CustomersService = require('../../3. core/business/customers.service');
const CustomersRepository = require('../../2. infrastructure/persistence/repositories/customers.repository');

const customersController = express.Router();

customersController.route('').post(function (req, res) {
    runOnService(async service => {
        const result = await service.createCustomer(req.body.name, req.body.email);
        res.status(result.httpCode(201)).json(result.toPlain());
    });
});

customersController.route('/:id/loyalty').patch(function (req, res) {
    runOnService(async service => {
        const result = await service.toggleLoyalty(req.params.id);
        res.status(result.httpCode(204)).json(result.toPlain());
    });
});

customersController.route('/:id').delete(function (req, res) {
    runOnService(async service => {
        const result = await service.deleteCustomer(req.params.id);
        res.status(result.httpCode(204)).json(result.toPlain());
    });
});

function runOnService(callback) {
    const service = new CustomersService(new CustomersRepository());
    callback(service);
} 

module.exports = customersController;