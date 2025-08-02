const { Router } = require("express");
const { validateId } = require(`${process.cwd()}/app/helpers/endpoint.js`);

module.exports = Router({ mergeParams: true }).get("/product/:id", async (req, res, next) => {
  try {
    const { db } = req
    const { id } = req.params;
    validateId(id);

    const product = await db.Product.findById(id);

    res.json({ product });
  } catch (e) {
    next(e);
  }
});