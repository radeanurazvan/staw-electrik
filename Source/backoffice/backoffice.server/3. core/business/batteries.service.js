const validator = require('fluent-validator');
const Result = require('../../../../kernel/functional/result');

module.exports = class BatteriesService {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    async deleteDefinition(id) {
        const definition = await this.#repository.getDefinition(id);
        const result = validator()
            .validate(definition).param('definition').isNotNullOrUndefined();

        return Result.fromValidationResult(result)
            .onSuccess(async () => await this.#repository.deleteDefinition(definition.id));
    }

    async promoteDefinition(id, stock, price) {
        const definition = await this.#repository.getDefinition(id);
        const result = validator()
            .validate(definition).param('definition').isNotNullOrUndefined()
            .validate(price).param('price').isPositive()
            .validate(stock).param('stock').isPositive();
        
        return Result.fromValidationResult(result, definition)
            .map(d => d.promote(stock, price))
            .onSuccess(async a => { await this.#repository.addInCatalog(a)})
            .onSuccess(async () => await this.#repository.deleteDefinition(definition.id));
    }
}