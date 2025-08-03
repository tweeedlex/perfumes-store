const { Router } = require("express");
const { requiredCheck } = require(`${process.cwd()}/app/helpers/endpoint.js`);

module.exports = Router({ mergeParams: true }).post("/admin/product", async (req, res, next) => {
  try {
    const { db, ApiError } = req
    const { name, price, discountPrice, description, label, stock, filters } = req.body;
    requiredCheck({ name, price });

    const existingProduct = await db.Product.findOne({
      name: name.trim(),
    });
    if (existingProduct) {
      return next(ApiError.BadRequest("Product with this name already exists"));
    }

    const filterIds = filters.map((filter) => filter._id);
    const filterObjects = await db.Filter.find({ _id: { $in: filterIds }});

    if (filterObjects.length !== filterIds.length) {
      return next(ApiError.BadRequest("One or more filters do not exist"));
    }

    const filterValues = filters.map((filter) => ({
      filterId: filter._id,
      value: filter.value,
    }));

    await db.FilterValue.bulkWrite(
      filterValues.map(fv => ({
        updateOne: {
          filter: { filterId: fv.filterId, value: fv.value },
          update: { $setOnInsert: fv },
          upsert: true,
        }
      }))
    );

    // bulkWrite returns only insertedIds, as we need to get all including existing ones
    const filterValueDocs = await db.FilterValue.find({
      $or: filterValues.map(fv => ({ filterId: fv.filterId, value: fv.value }))
    }).select('_id');
    const filterValueIds = filterValueDocs.map(doc => doc._id);

    const product = await db.Product.create({ name, price, discountPrice, description, label, stock, filters: filterValueIds });

    res.json({ product });
  } catch (e) {
    next(e);
  }
});