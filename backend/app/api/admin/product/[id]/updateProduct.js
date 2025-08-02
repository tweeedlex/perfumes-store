const { Router } = require("express");
const { requiredCheck } = require(`${process.cwd()}/app/helpers/endpoint.js`);

module.exports = Router({ mergeParams: true }).put("/admin/product/:id", async (req, res, next) => {
  try {
    const { db, ApiError } = req;
    const { name, price, discountPrice, description, label, stock } = req.body;
    const { id } = req.params;
    requiredCheck({ name, price });

    const existingProduct = await db.Product.findOne({
      name: name.trim(),
      _id: { $ne: id }
    });
    if (existingProduct) {
      return next(ApiError.BadRequest("Product with this name already exists"));
    }

    const updatedProduct = await db.Product.findByIdAndUpdate(
      id,
      { name, price, discountPrice, description, label, stock },
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