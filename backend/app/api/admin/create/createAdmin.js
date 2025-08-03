const { Router } = require("express");
const { requiredCheck } = require(`${process.cwd()}/app/helpers/endpoint`);

module.exports = Router({ mergeParams: true }).post("/admin/create", async (req, res, next) => {
  try {
    const { db } = req;
    const { email } = req.body;
    requiredCheck({ email });

    const existingAdmin = await db.Admin.findOne({ email: email.trim() });
    if (existingAdmin) {
      return res.json({admin: existingAdmin});
    }

    const admin = await db.Admin.createAdmin({ email });

    res.json({admin});
  } catch (e) {
    next(e);
  }
});