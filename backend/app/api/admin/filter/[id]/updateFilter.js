const { Router } = require("express");
const { requiredCheck } = require(`${process.cwd()}/app/helpers/endpoint.js`);

module.exports = Router({ mergeParams: true }).put("/admin/filter/:id", async (req, res, next) => {
  try {
    const { db, ApiError } = req;
    const { name, slug } = req.body;
    const { id } = req.params;

    requiredCheck({ name, slug });

    const existingFilter = await db.Filter.findOne({
      $or: [{ name }, { slug }],
      _id: { $ne: id }
    });

    if (existingFilter) {
      return next(ApiError.BadRequest("Filter with this name or slug already exists"));
    }

    const updatedFilter = await db.Filter.findByIdAndUpdate(
      id,
      { name, slug },
      { new: true }
    );

    if (!updatedFilter) {
      return next(ApiError.NotFound("Filter not found"));
    }

    res.json({ filter: updatedFilter });
  } catch (e) {
    next(e);
  }
});
