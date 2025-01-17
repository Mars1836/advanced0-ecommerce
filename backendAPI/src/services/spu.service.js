const { ErrorResponse } = require("../core/error.response");
const { attrModel, attrItemModel } = require("../models/attribute.model");
const shopModel = require("../models/shop.model");
const skuModel = require("../models/sku.model");
const spuModel = require("../models/spu.model");
const { getUnSelectData, delUnValueField } = require("../utils");
const AttrService = require("./attribute.service");
const InventoryService = require("./inventory.service");
const NotificationService = require("./notification.service");
const SKUService = require("./sku.service");

class SPUService {
  static async search({ text }, { page = 1, sort = 0, limit = 10 }) {
    console.log(text);
    const spus = await spuModel
      .find(
        {
          $text: { $search: text },
        },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return spus;
  }
  static async findSuggestSPU() {
    const spu = await spuModel
      .find()
      .lean()
      .select(
        getUnSelectData([
          "__v",
          "createdAt",
          "isDeleted",
          "isDraft",
          "isPublished",
        ])
      );
    return spu;
  }
  static async findWithSKU({ spu_id }, { _detail }) {
    const spu = await spuModel
      .findOne({ id: spu_id })
      .lean()
      .select(
        getUnSelectData([
          "__v",
          "createdAt",
          "isDeleted",
          "isDraft",
          "isPublished",
        ])
      );

    if (!spu) {
      throw new ErrorResponse("This spu doesn't exist");
    }
    const skus = await skuModel
      .find({ spu_id })
      .lean()
      .select(
        getUnSelectData([
          "__v",
          "createdAt",
          "isDeleted",
          "isDraft",
          "isPublished",
          "updatedAt",
        ])
      );
    if (_detail == 1) {
      const attr_item = await attrItemModel
        .findOne({ id: spu?.attribute?.attr_item_id })
        .select(getUnSelectData(["__v", "createdAt", "updatedAt", "_id"]))
        .lean();
      if (spu && spu.attribute) {
        spu.attribute.attr_item = attr_item;
      }
    }
    return { ...spu, skus };
  }
  static async create(
    { shopId },
    {
      name,
      thumb,
      description,
      price,
      catagories,
      attribute,
      variations,
      sku_list = [],
      stock,
      location,
    }
  ) {
    const { attr_name, attr_item } = attribute;
    const shop = await shopModel.findById(shopId).lean();
    const attr = await attrModel.findOne({ name: attr_name });
    if (!attr) {
      throw new ErrorResponse("This attribute is not exist!");
    }
    const aItem = await AttrService.createItem({
      attrId: attr.id,
      name: attr_item.name,
      description: attr_item.description,
      spec: attr_item.spec,
    });
    if (!aItem) {
      throw new ErrorResponse("Some thing wrong!");
    }
    let attrPro = {
      attr_name,
      attr_item_id: aItem.id,
    };
    const spu = await spuModel.create({
      name,
      thumb,
      description,
      price,
      catagories,
      attribute: attrPro,
      variations,
      shopId,
    });
    if (spu && sku_list.length > 0) {
      await SKUService.createBaseOnSPU({ spu_id: spu.id, sku_list, shopId });
      await NotificationService.createByShop({
        title: "New product release!",
        content: `${shop.name} store recently launched ${name}!`,
        senderId: shop._id,
        recipientIds: shop.followers,
      });
      return spu;
    }
    const inventory = {
      spuId: spu.id,
      location,
      shopId,
      stock,
    };
    delUnValueField(inventory);
    await InventoryService.create(inventory);
    await NotificationService.createByShop({
      title: "New product release!",
      content: `${req.shop.ob.name} store recently launched ${name}!`,
      senderId: req.shop.ob.id,
      recipientIds: shop.followers,
    });
    return spu;
  }
}
module.exports = SPUService;
