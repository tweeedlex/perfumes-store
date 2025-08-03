const { Router } = require("express");
const { requiredCheck } = require(`${process.cwd()}/app/helpers/endpoint.js`);

module.exports = Router({ mergeParams: true }).put("/admin/product/:id", async (req, res, next) => {
  try {
    const { db, ApiError } = req;
    const { name, price, discountPrice, description, label, stock, filters } = req.body;
    const { id } = req.params;

    requiredCheck({ name, price });

    const existingProduct = await db.Product.findOne({
      name: name.trim(),
      _id: { $ne: id }
    });

    if (existingProduct) {
      return next(ApiError.BadRequest("Product with this name already exists"));
    }

    let filterValueIds = [];

    if (filters?.length) {
      const filterIds = filters.map((filter) => filter._id);
      const filterObjects = await db.Filter.find({ _id: { $in: filterIds } });

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

      const filterValueDocs = await db.FilterValue.find({
        $or: filterValues.map(fv => ({ filterId: fv.filterId, value: fv.value }))
      }).select('_id');

      filterValueIds = filterValueDocs.map(doc => doc._id);
    }

    const updatedProduct = await db.Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        discountPrice,
        description,
        label,
        stock,
        ...(filters === undefined ? {} : { filters: filterValueIds })
      },
      { new: true }
    );

    if (!updatedProduct) {
      return next(ApiError.NotFound("Product not found"));
    }

    res.json({ product: updatedProduct });
  } catch (e) {
    next(e);
  }
});
