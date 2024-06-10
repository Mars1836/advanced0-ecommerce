const { connectToRabbitMQ, consumerQueue } = require("../dbs/init.rabbitmq");
const exchangeNameMain = "notification_exchange";
const queueNameMain = "notification_queue";
const exchangeNameDLX = "notification_dlx_exchange";
const routingKeyDLX = "routing_key_DLX";
const handlerQueueName = "handler_queue_name";
const notificationExchangeName = "exchange1";
const messageService = {
  consomerNotification: async (io) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      await channel.assertExchange(notificationExchangeName, "direct", {
        durable: true,
      });
      const { queue } = await channel.assertQueue("notificationQueue");
      await channel.bindQueue(queue, notificationExchangeName, "notification");
      channel.consume(queue, (msg) => {
        const data = JSON.parse(msg.content);
        console.log(data);
        // const ids = msg.content.recipientIds;'
        const ids = ["6658b7f7b88517c6bdfd803a", "6659275d3dc986ddf3568412"];
        io.to(ids).emit("notification", data);
        channel.ack(msg);
      });
    } catch (error) {}
  },
  consomerQueue: async (queueName) => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      await consumerQueue(queueName, channel);
    } catch (error) {
      console.error(error);
    }
  },

  consumerToQueueNormal: async () => {
    try {
      const { channel, connection } = await connectToRabbitMQ();

      await channel.consume(queueNameMain, (msg) => {
        try {
          throw new Error("Something wrong happended!");
          console.log(
            `Queue ${queueNameMain} get message: ${msg.content.toString()}`
          );
          channel.ack(msg);
        } catch (error) {
          channel.nack(msg, false, false);
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  consumerToQueueFail: async () => {
    try {
      const { channel, connection } = await connectToRabbitMQ();
      await channel.assertExchange(exchangeNameDLX, "direct", {
        durable: true,
      });
      await channel.assertQueue(handlerQueueName, { exclusive: true });
      await channel.bindQueue(handlerQueueName, exchangeNameDLX, routingKeyDLX);
      await channel.consume(
        handlerQueueName,
        (msg) => {
          console.log(
            `Handle error queue ${handlerQueueName} get message: ${msg.content.toString()}`
          );
        },
        {
          noAck: true,
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = messageService;
