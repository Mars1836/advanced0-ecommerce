const { SuccessResponse } = require("../core/success.response");
const NotificationService = require("../services/notification.service");

class NotificationController {
  static async getByUser(req, res, next) {
    const metadata = await NotificationService.getByUser({ ...req.query });
    new SuccessResponse({ message: "Get notification success", metadata }).send(
      res
    );
  }
  static async getAll(req, res, next) {
    const metadata = await NotificationService.getAll();
    new SuccessResponse({ message: "Get notification success", metadata }).send(
      res
    );
  }
  static async createByShop(req, res, next) {
    const metadata = await NotificationService.createByShop(
      { shopId: req.shop.ob.id },
      { ...req.query }
    );
    new SuccessResponse({
      message: "Create shop notification success",
      metadata,
    }).send(res);
  }
  static async testRb(req, res, next) {
    const metadata = await NotificationService.testRb();
    new SuccessResponse({
      message: "Test RB",
      metadata,
    }).send(res);
  }
}
module.exports = NotificationController;
