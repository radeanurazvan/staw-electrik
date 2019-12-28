const amqp = require("amqplib");

const busFactory = function(config){
    const channelPromise = amqp.connect(config.connectionStrings.mongo)
    .then(conn => conn.createChannel());;
    
    async function publish(queue, message) {
        const channel = await channelPromise;
        channel.assertQueue(queue);
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
    }

    return {publish};
};

module.exports = busFactory;
