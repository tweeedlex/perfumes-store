const { Router } = require("express");
const { requiredCheck } = require(`${process.cwd()}/app/helpers/endpoint.js`);

module.exports = Router({ mergeParams: true }).post("/admin/product", async (req, res, next) => {
  try {
    const { db, ApiError } = req
    const { name, price, discountPrice, description, label, stock } = req.body;
    requiredCheck({ name, price });

    const existingProduct = await db.Product.findOne({
      name: name.trim(),
    });
    if (existingProduct) {
      return next(ApiError.BadRequest("Product with this name already exists"));
    }

    const product = await db.Product.create({ name, price, discountPrice, description, label, stock });

    res.json({ product });
  } catch (e) {
    next(e);
  }
});