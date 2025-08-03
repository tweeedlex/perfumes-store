const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { requiredCheck } = require(`${process.cwd()}/app/helpers/endpoint`);

module.exports = Router({ mergeParams: true }).post("/auth/admin/:id", async (req, res, next) => {
  try {
    const { db, ApiError } = req;
    const { id } = req.params;
    const { code } = req.body;

    requiredCheck({ code });

    const admin = await db.Admin.findOne({ id: Number(id) });
    if (!admin) {
      next(ApiError.NotFound("Admin not found"))
    }

    const otpEntry = await db.AdminOTP.findOne({
      adminId: admin._id,
      code: code.trim(),
      expiresAt: { $gt: new Date() }
    });

    if (!otpEntry) {
      next(ApiError.UnauthorizedError("Invalid or expired OTP"));
    }

    await db.AdminOTP.deleteOne({ _id: otpEntry._id });

    const token = jwt.sign(
      { adminId: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: (+process.env.ADMIN_COOKIE_ALIVE_DAYS || 14) * 24 * 60 * 60 * 1000
    });

    res.json({ message: "OTP verified", admin: { id: admin.id, email: admin.email } });

  } catch (e) {
    next(e);
  }
});
