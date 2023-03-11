const { createError, sendMail } = require("../../helpers");
const User = require("../../models/users");

async function resendConfirmationUser(req, res) {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Confirmation of registration",
    html: `<a href='http://localhost:3000/api/users/verify/:${user.verificationToken}'>Follow the link to confirm your registration.</a>`,
  };

  await sendMail(mail);

  res.status(200).json({
    message: "Verification email sent",
  });
}

module.exports = {
  resendConfirmationUser,
};
