const express = require('express');
const OrdersService = require('../../3. core/business/orders.service');
const OrdersRepository = require('../../2. infrastructure/persistence/repositories/orders.repository');
const BatteriesRepository = require('../../2. infrastructure/persistence/repositories/batteries.repository');
const AccumulatorsRepository = require('../../2. infrastructure/persistence/repositories/accumulators.repository');
const CustomersRepository = require('../../2. infrastructure/persistence/repositories/customers.repository');

const ordersController = express.Router();

ordersController.route('').post(function (req, res) {
    runOnService(async service => {
        const result = await service.createOrder(req.body.customerId, req.body.batteries, req.body.accumulators);
        res.status(result.httpCode(201)).json(result.toPlain());
    });
});

function runOnService(callback) {
    const service = new OrdersService({
        batteries: new BatteriesRepository(),
        accumulators: new AccumulatorsRepository(),
        customers: new CustomersRepository(),
        orders: new OrdersRepository()
    });
    callback(service);
} 

module.exports = ordersController;