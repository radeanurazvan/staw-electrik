const newUuid = require('uuid/v1');

module.exports = class Order {
    #id;
    #customerId;
    #batteries;
    #accumulators;
    #placedAt;

    constructor(customerId, orderBatteries, orderAccumulators, id = newUuid(), placedAt = new Date()) {
        this.#id = id;
        this.#customerId = customerId;
        this.#batteries = orderBatteries;
        this.#accumulators = orderAccumulators;
        this.#placedAt = placedAt;
    }

    get id() { return this.#id; }
    get customerId() { return this.#customerId; }
    get batteries() { return this.#batteries; }
    get accumulators() { return this.#accumulators; }
    get placedAt() { return this.#placedAt; }
}