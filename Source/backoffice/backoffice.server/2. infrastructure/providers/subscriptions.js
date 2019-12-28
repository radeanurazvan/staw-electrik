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
            console.log("WTFFF", x);
            await this.#repositories.batteries.addDefinition(new BatteryDefinition(x.id, x.name, x.size))
        });
        this.#bus.subscribe(queues.accumulators, x => 
            this.#repositories.accumulators.addDefinition(new AccumulatorDefinition(x.id, x.name, x.category)));
        this.#bus.subscribe(queues.energyProviders, x => 
            this.#repositories.energyProviders.addDefinition(new EnergyProviderDefinition(x.id, x.name, x.coordinates)));
    }
}