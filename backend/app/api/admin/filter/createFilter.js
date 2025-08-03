const { Router } = require("express");
const { requiredCheck } = require(`${process.cwd()}/app/helpers/endpoint.js`);

module.exports = Router({ mergeParams: true }).post("/admin/filter", async (req, res, next) => {
  try {
    const { db, ApiError } = req
    const { name, slug } = req.body;
    requiredCheck({ name, slug });

    const existingFilter = await db.Filter.findOne({
      $or: [{ name }, { slug }],
    });
    if (existingFilter) {
      return next(ApiError.BadRequest("Filter with this name or slug already exists"));
    }

    const filter = await db.Filter.create({ name, slug });
    res.json({ filter });
  } catch (e) {
    next(e);
  }
});