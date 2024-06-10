"use strict";

const { connectToRabbitMQTest } = require("../dbs/init.rabbitmq");

describe("Rabbit MQ Connection", () => {
  it("should connect successful RabbitMq", async () => {
    const rs = await connectToRabbitMQTest();
    expect(rs).toBeUndefined();
  });
});
