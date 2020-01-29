const OrderModel = require('../models/order.model');
const Order = require('../../../3. core/domain/order/order');

module.exports = class OrdersRepository {
    addOrder(order) {
        const dbOrder = new OrderModel({
            _id: order.id,
            customer: order.customer,
            batteries: order.batteries,
            accumulators: order.accumulators,
            placedAt: order.placedAt
        });
        
         return dbOrder.save();
    }
};