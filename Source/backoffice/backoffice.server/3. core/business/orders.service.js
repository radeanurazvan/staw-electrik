const validator = require('fluent-validator');
const Result = require('../../../../kernel/functional/result');
const Order = require('../domain/order/order');

module.exports = class OrdersService {
    #repositories;

    constructor(repositories) {
        this.#repositories = repositories;
    }

    async createOrder(customerId, batteries, accumulators) {
        const customer = await this.#repositories.customers.getCustomer(customerId);
        const orderBatteries = batteries.map(async (b) => {
            const battery = await this.#repositories.batteries.getCatalogBattery(b.id);
            return {
                battery,
                quantity: b.quantity
            };
        });
        const orderAccumulators = accumulators.map(async (a) => {
            const accumulator = await this.#repositories.accumulators.getCatalogAccumulator(a.id);
            return {
                accumulator,
                quantity: b.quantity
            };
        });

        const result = validator()
            .validate(customer).param('customer').isNotNullOrUndefined()
            .validate(orderBatteries).param('batteries').passes((x) => !x.some((y) => !y.battery), 'Invalid batteries')
            .validate(orderBatteries).param('batteries').passes((x) => !x.some((y) => y.quantity <= 0), 'Invalid batteries quantity')
            .validate(orderAccumulators).param('accumulators').passes((x) => !x.some((y) => !y.accumulator), 'Invalid accumulators')
            .validate(orderAccumulators).param('accumulators').passes((x) => !x.some((y) => y.quantity <= 0), 'Invalid accumulators quantity');
        
        return Result.fromValidationResult(result)
            .map(() => new Order(customerId, orderBatteries, orderAccumulators))
            .onSuccess(async (o) => await this.#repository.orders.addOrder(o));
    }
}