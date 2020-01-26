const CustomerModel = require('../models/customer.model');
const Customer = require('../../../3. core/domain/customer/customer');

module.exports = class BatteriesRepository {
    async getCustomers() {
        const dbCustomers = await CustomerModel.find();
        return dbCustomers.map(c => new Customer(c.name, c.email, c._id));
    }

    async getCustomer(id) {
        const dbCustomer = await CustomerModel.findById(id);
        if(!dbCustomer) {
            return null;
        }

        return new Customer(dbCustomer.name, dbCustomer.email, dbCustomer._id);
    }

    addCustomer(customer) {
        const dbCustomer = new CustomerModel({
            _id: customer.id,
            name: customer.name,
            email: customer.email
        });
        
         return dbCustomer.save();
    }

    deleteCustomer(customer) {
        console.log("Deleting ", customer.id);
        return CustomerModel.deleteOne({_id: customer.id});
    }
};