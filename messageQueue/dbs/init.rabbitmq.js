"use strict";
const amqp = require("amqplib");
const rabbit_url = "amqp://localhost:5672";
const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(rabbit_url);
    const channel = await connection.createChannel();

    return { connection, channel };
  } catch (error) {
    console.log(error.message || error);
    console.log("loi cmnr ");
  }
};
const connectToRabbitMQTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();
    const queueName = "queue_test";
    const msg = "Hello this is message from connectToRabbitMQTest";
    await channel.assertQueue(queueName, {
      durable: true,
    });
    await channel.sendToQueue(queueName, Buffer.from(msg));
    await connection.close();
  } catch (error) {
    console.error("RabbitMQ error: ", error);
  }
};
const consumerQueue = async (queueName, channel) => {
  try {
    await channel.assertQueue(queueName, {
      durable: true,
    });
    channel.consume(queueName, (msg) => {
      console.log(`Receive message ${queueName} :: ${msg.content.toString()}`);
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
module.exports = { connectToRabbitMQ, connectToRabbitMQTest, consumerQueue };
