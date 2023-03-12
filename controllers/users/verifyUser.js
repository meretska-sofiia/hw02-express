const { createError } = require("../../helpers");
const User = require("../../models/users");

async function verifyUser(req, res) {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw createError(404, "Not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verificationToken: "",
    verify: true,
  });
  res.status(200).json({
    message: "Verification successful",
  });
}

module.exports = {
  verifyUser,
};
