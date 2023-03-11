const User = require("../../models/users");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { createError, sendMail } = require("../../helpers");

const bcrypt = require("bcryptjs");

async function registerUser(req, res, next) {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, { protocol: "https" });

  const verificationToken = nanoid();

  const result = await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a href='http://localhost:3000/api/users/verify/:${verificationToken}'>Follow the link to confirm your registration.</a>`,
  };

  await sendMail(mail);

  res.status(201).json({
    email: result.email,
    subscription: result.subscription,
  });
}

module.exports = registerUser;
