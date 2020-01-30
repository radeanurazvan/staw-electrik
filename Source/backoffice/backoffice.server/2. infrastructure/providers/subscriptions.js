const io = require('socket.io');
const queues = require('../../../../kernel/messaging/queues');
const BatteryDefinition = require('../../3. core/domain/battery/battery-definition');
const AccumulatorDefinition = require('../../3. core/domain/accumulator/accumulator-definition');
const EnergyProviderDefinition = require('../../3. core/domain/energy-provider/energy-provider-definition');

module.exports = class BusSubscriptions {
    #bus;
    #repositories;

    constructor(bus, repositories) {
        this.#bus = bus;
        this.#repositories = repositories;
    }

    async bootstrap() {
        this.#bus.subscribe(queues.batteries, async x => {
            await this.#repositories.batteries.addDefinition(new BatteryDefinition(x.id, x.name, x.size))
        });
        this.#bus.subscribe(queues.accumulators, async x => {
            await this.#repositories.accumulators.addDefinition(new AccumulatorDefinition(x.id, x.name, x.category, x.size))
        });
        this.#bus.subscribe(queues.energyProviders, async x => {
            await this.#repositories.energyProviders.addDefinition(new EnergyProviderDefinition(x.id, x.name, x.coordinates))
        });

        this.#bus.subscribe('PRICE_CHANGED', async x => {
            const customers = await this.repositories.customers.getCustomers();
            const loyalCustomers = customers.filter(c => c.isLoyal);

            loyalCustomers.forEach(c => {
                io().for(c.email).emit('PRICE_CHANGED', x);
            });
        });
        
        this.#bus.subscribe('STOCK_CHANGED', async x => {
            const customers = await this.repositories.customers.getCustomers();
            const loyalCustomers = customers.filter(c => c.isLoyal);

            loyalCustomers.forEach(c => {
                io().for(c.email).emit('STOCK_CHANGED', x);
            });
        });
    }
}