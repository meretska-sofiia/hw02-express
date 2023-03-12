const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const updateSubscription = require("./updateSubscriptionUser");
const avatarUser = require("./avatarUser");
const verifyUser = require("./verifyUser");
const resendConfirmationUser = require("./resendCofirmationUser");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateSubscription,
  avatarUser,
  verifyUser,
  resendConfirmationUser,
};
