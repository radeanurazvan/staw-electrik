const newUuid = require('uuid/v1');

module.exports = class Customer {
    #id;
    #name;
    #email;

    constructor(name, email, id = newUuid()) {
        this.#id = id;
        this.#name = name;
        this.#email = email;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get email() { return this.#email; }
}