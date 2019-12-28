module.exports = class EnergyProviderDefinition {
    #id;
    #name;
    #coordinates;

    constructor(id, name, coordinates) {
        this.#id = id;
        this.#name = name;
        this.#coordinates = coordinates;
    }
}