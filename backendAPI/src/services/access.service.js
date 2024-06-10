"use strict";
const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("./keyToken.service");
const utils = require("../utils");
const {
  ErrorResponse,
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const ShopService = require("./shop.service");
const UserService = require("./user.service");
const { getInforData } = require("../utils");
const { createTokenPair } = require("../auth/authUtils");
const JWT = require("jsonwebtoken");
const userModel = require("../models/user.model");
const RoleShop = {
  ADMIN: "000",
  SHOP: "001",
  WRITER: "002",
  EDITER: "003",
};
function logout(object) {
  return async ({ objectId }) => {
    if (!objectId) {
      throw new AuthFailureError("This action required authentication");
    }
    const delKey = await KeyTokenService.deleteByObject({
      objectType: object, //
      objectId,
    });
    return delKey;
  };
}
function signIn(object) {
  let model;
  if (object === "shop") {
    model = shopModel;
  } else if (object === "user") {
    model = userModel;
  }
  return async ({ email, password, refreshToken = null }) => {
    if (!email) {
      throw new BadRequestError("Email or password has not been entered!");
    }
    const storedOb = await model.findOne({ email });
    if (!storedOb) {
      throw new AuthFailureError("Authentication error");
    }
    const isMatchPassword = await bcrypt.compare(password, storedOb.password);
    console.log(storedOb.password);
    console.log(isMatchPassword);
    if (!isMatchPassword) {
      throw new AuthFailureError("Authentication error");
    }
    const privateKey = crypto.randomBytes(64).toString("hex");
    const publicKey = crypto.randomBytes(64).toString("hex");

    const tokens = await createTokenPair(
      { id: storedOb._id, email: storedOb.email },
      publicKey,
      privateKey
    );
    await KeyTokenService.createKeyToken({
      objectId: storedOb._id,
      objectType: object,
      privateKey,
      publicKey,
      refreshToken: tokens.refreshToken,
    });

    return {
      [object]: getInforData({
        fields: ["_id", "email", "name"],
        object: storedOb,
      }),
      tokens,
    };
  };
}
function signUp(object) {
  let model;
  if (object === "shop") {
    model = shopModel;
  } else if (object === "user") {
    model = userModel;
  }
  return async ({ name, email, password }) => {
    // check email exits
    const storedObject = await model.findOne({ email }).lean();
    if (storedObject) {
      throw new BadRequestError("Your email already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const ob = await model.create({
      name,
      email,
      password: passwordHash,
    });

    if (ob) {
      const privateKey = crypto.randomBytes(64).toString("hex");
      const publicKey = crypto.randomBytes(64).toString("hex");
      const keyStore = await KeyTokenService.createKeyToken({
        userId: ob._id,
        publicKey: publicKey,
        privateKey: privateKey,
      });
      if (!keyStore) {
        throw new BadRequestError("Key store error");
      }
      // const publicKeyObect = crypto.createPublicKey(publicKeyString);
      const tokens = await createTokenPair(
        { userId: ob._id, email },
        publicKey,
        privateKey
      );
      return {
        [object]: utils.getInforData({
          fields: ["_id", "name", "email"],
          object: ob,
        }),
        tokens,
      };
    }
  };
}
class AccessService {
  static handleAccessTokenV2 = async ({ refreshToken, user, keyStore }) => {
    const { userId, email } = user;
    if (keyStore.refreshTokensUsed.includes(refreshToken)) {
      await KeyTokenService.deleteByUserId({ userId: userId });
      throw new ForbiddenError("Something wrong happened! Pls relogin!");
    }
    if (keyStore.refreshToken != refreshToken) {
      throw new AuthFailureError("Invalid token!");
    }

    const storedShop = await ShopService.findByEmail({ email });
    if (!storedShop) {
      throw AuthFailureError("Shop is not registed");
    }
    const tokens = await createTokenPair(
      {
        userId,
        email,
      },
      keyStore.publicKey,
      keyStore.privateKey
    );
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: { refreshTokensUsed: refreshToken },
    });
    return {
      shop: utils.getInforData({
        fields: ["_id", "name", "email"],
        object: storedShop,
      }),
      tokens,
    };
  };
  static handleAccessToken = async ({ refreshToken }) => {
    console.log("refreshtoken", refreshToken);
    const unauthToken = await KeyTokenService.findByRefreshTokenUsed({
      refreshTokenUsed: refreshToken,
    });

    if (unauthToken) {
      // refreshtoken da su dung hay chua // kiem tra tinh hop le cua refreshtoken

      const { userId, email } = JWT.verify(
        refreshToken,
        unauthToken.privateKey
      );
      await KeyTokenService.deleteByUserId({ userId });
      throw new ForbiddenError("Something wrong happend !! Please login again");
    }
    const authToken = await KeyTokenService.findByRefreshToken({
      refreshToken,
    });
    if (!authToken) {
      throw new AuthFailureError("Token is not valid");
    }
    const { userId, email } = JWT.verify(refreshToken, authToken.privateKey);
    const storedShop = await ShopService.findByEmail({ email });
    if (!storedShop) {
      throw AuthFailureError("Shop is not registed");
    }
    const tokens = await createTokenPair(
      {
        userId,
        email,
      },
      authToken.publicKey,
      authToken.privateKey
    );
    await authToken.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: { refreshTokensUsed: refreshToken },
    });
    return {
      shop: utils.getInforData({
        fields: ["_id", "name", "email"],
        object: storedShop,
      }),
      tokens,
    };
  };
  static logoutByUser = logout("user");
  static logoutByShop = logout("shop");

  static signInByUser = signIn("user");
  static signInByShop = signIn("shop");
  static signUpByShop = signUp("shop");
  static signUpByUser = signUp("user");
}
module.exports = AccessService;
