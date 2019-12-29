const validator = require('fluent-validator');
const Result = require('../../../../kernel/functional/result');

module.exports = class EnergyProvidersService {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    async deleteDefinition(id) {
        const definition = await this.#repository.getDefinition(id);
        const result = validator()
            .validate(definition).param('definition').isNotNullOrUndefined();

        return Result.fromValidationResult(result, definition)
            .onSuccess(async () => await this.#repository.deleteDefinition(definition.id));
    }

    async promoteDefinition(id, pricePerUnit) {
        const definition = await this.#repository.getDefinition(id);
        const result = validator()
            .validate(definition).param('definition').isNotNullOrUndefined()
            .validate(pricePerUnit).param('pricePerUnit').isPositive();
        
        return Result.fromValidationResult(result, definition)
            .map(d => d.promote(pricePerUnit))
            .onSuccess(async ep => { await this.#repository.addInCatalog(ep)})
            .onSuccess(async () => await this.#repository.deleteDefinition(definition.id));
    }
}