const { Router } = require("express");

module.exports = Router().get("/catalog", async (req, res, next) => {
  try {
    const { db } = req;

    const {
      search = "",
      minPrice = 0,
      maxPrice = Number.MAX_SAFE_INTEGER,
      page = 1,
      limit = 40,
      ...filterQuery
    } = req.query;

    const numericPage = Math.max(Number(page), 1);
    const numericLimit = Math.max(Number(limit), 1);

    const allFilters = await db.Filter.find().lean();

    const filterSlugToIdMap = Object.fromEntries(
      allFilters.map(f => [f.slug, f._id.toString()])
    );

    const filterConditions = [];

    for (const [key, value] of Object.entries(filterQuery)) {
      const filterId = filterSlugToIdMap[key];
      if (!filterId || !value) continue;

      const values = Array.isArray(value) ? value : [value];

      const matchingValues = await db.FilterValue.find({
        filter: filterId,
        value: { $in: values }
      }).select('_id').lean();

      const ids = matchingValues.map(v => v._id);
      if (ids.length > 0) {
        filterConditions.push({ filters: { $in: ids } });
      }
    }

    const productQuery = {
      price: { $gte: +minPrice },
      ...(search && { name: new RegExp(search, "i") }),
      ...(filterConditions.length > 0 ? { $and: filterConditions } : {})
    };

    const totalProducts = await db.Product.countDocuments(productQuery);

    const maxPriceProduct = await db.Product.find(productQuery)
    .sort({ price: -1 })
    .limit(1)
    .select('price')
    .lean();

    const actualMaxPrice = maxPriceProduct[0]?.price || 0;

    const products = await db.Product.find({
      ...productQuery,
      price: { ...productQuery.price, $lte: +maxPrice }
    })
    .populate({ path: "filters", populate: { path: "filter" } })
    .skip((numericPage - 1) * numericLimit)
    .limit(numericLimit)
    .lean();

    const usedFilterValueIds = new Set();
    for (const product of products) {
      for (const fv of product.filters || []) {
        usedFilterValueIds.add(fv._id.toString());
      }
    }

    const usedFilterValues = await db.FilterValue.find({
      _id: { $in: Array.from(usedFilterValueIds) }
    }).populate("filter").lean();

    const filtersResponse = [];

    for (const filter of allFilters) {
      const values = usedFilterValues.filter(fv =>
        fv.filter._id.toString() === filter._id.toString()
      );

      const uniqueValues = [...new Map(
        values.map(v => [v.value, v])
      ).values()];

      for (const v of uniqueValues) {
        filtersResponse.push({
          name: filter.name,
          slug: filter.slug,
          value: v.value,
          chosen: filterQuery[filter.slug]?.includes?.(v.value)
            || filterQuery[filter.slug] === v.value
        });
      }
    }

    res.json({
      products,
      filters: filtersResponse,
      search,
      minPrice: +minPrice,
      maxPrice: actualMaxPrice,
      total: totalProducts,
      page: numericPage,
      limit: numericLimit
    });
  } catch (e) {
    next(e);
  }
});
