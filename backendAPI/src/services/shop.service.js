const shopModel = require("../models/shop.model");

class ShopService {
  static findByEmail = async ({
    email,
    select = { email: 1, password: 1, name: 1, status: 1, roles: 1 },
  }) => {
    const storedShop = shopModel.findOne({ email }).select(select).lean();
    return storedShop;
  };
  static findById = async ({
    id,
    select = { email: 1, password: 1, name: 1, status: 1, roles: 1 },
  }) => {
    const storedShop = shopModel.findById(id).select(select).lean();
    return storedShop;
  };
  static addFollower = async ({ userId, shopId }) => {
    const options = {
      new: true,
    };
    const update = {
      $addToSet: {
        followers: userId,
      },
    };
    const shop = await shopModel.findOneAndUpdate(
      { _id: shopId },
      update,
      options
    );
    return shop;
  };
  static removeFollower = async ({ userId, shopId }) => {
    const options = {
      new: true,
    };
    const update = {
      $pull: {
        followers: userId,
      },
    };
    const shop = await shopModel.findOneAndUpdate(
      { _id: shopId },
      update,
      options
    );
    return shop;
  };
}
module.exports = ShopService;
