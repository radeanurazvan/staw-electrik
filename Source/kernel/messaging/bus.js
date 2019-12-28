const amqp = require("amqplib");

module.exports = class MessageBus {
    constructor(config) {
        this._channelPromise = amqp.connect(config.connectionStrings.amqp)
            .then(conn => conn.createChannel());
    }

    async publish(queue, message) {
        const channel = await this._channelPromise;
        channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }
}
