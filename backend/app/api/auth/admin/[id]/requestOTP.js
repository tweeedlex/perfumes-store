const { Router } = require("express");
const { createTransport } = require(`${process.cwd()}/app/helpers/mail`);
const { generateAlphaNumeric } = require(`${process.cwd()}/app/helpers/string`);

module.exports = Router({ mergeParams: true }).get("/auth/admin/:id", async (req, res, next) => {
  try {
    const { db } = req;
    const { id } = req.params;

    const admin = await db.Admin.findOne({ id: Number(id) });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const otp = generateAlphaNumeric(12);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await db.AdminOTP.findOneAndUpdate(
      { adminId: admin._id },
      { code: otp, expiresAt },
      { upsert: true, new: true }
    );

    const transport = createTransport();
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject: "Your OTP Code",
      text: `Your one-time password is: \n${otp}\n\nIt is valid for 10 minutes.`,
    });

    res.json({ message: "OTP sent to admin email. Please check spam folder if you do not see the mail." });
  } catch (e) {
    next(e);
  }
});
