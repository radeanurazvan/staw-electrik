const newUuid = require('uuid/v1');

module.exports = class CatalogBattery {
    #id;
    #definition;
    #stock;
    #price;

    constructor(definition, stock, price, id = newUuid()) {
        this.#id = id;
        this.#definition = definition;
        this.#stock = stock;
        this.#price = price;
    }

    get id() { return this.#id; }
    get definition() { return this.#definition; }
    get stock() { return this.#stock; }
    get price() { return this.#price; }
}
