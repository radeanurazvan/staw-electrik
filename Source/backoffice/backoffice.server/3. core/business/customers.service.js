const validator = require('fluent-validator');
const Result = require('../../../../kernel/functional/result');
const Customer = require('../domain/customer/customer');

module.exports = class CustomersService {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    async createCustomer(name, email) {
        const duplicateEmail = (await this.#repository.getCustomers())
            .some(c => c.email === email);
        const result = validator()
            .validate(duplicateEmail).param('uniqueEmail').passes(x => !x, 'Email shoud be unique!')
            .validate(name).param('definition').isNotEmpty()
            .validate(email).param('email').isNotEmpty();

        return Result.fromValidationResult(result)
            .onSuccess(async () => await this.#repository.addCustomer(new Customer(name, email)));
    }

    async deleteCustomer(id) {
        const customer = await this.#repository.getCustomer(id);
        const result = validator()
            .validate(customer).param('customer').isNotNullOrUndefined();
        
        return Result.fromValidationResult(result)
            .onSuccess(async () => await this.#repository.deleteCustomer(customer));
    }

    async toggleLoyalty(id) {
        const customer = await this.#repository.getCustomer(id);
        const result = validator()
            .validate(customer).param('customer').isNotNullOrUndefined();
        
        return Result.fromValidationResult(result)
            .onSuccess(() => customer.toggleLoyalty())
            .onSuccess(async () => await this.#repository.updateCustomer(customer));
    }
}