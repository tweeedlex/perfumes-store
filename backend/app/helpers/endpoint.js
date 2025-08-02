const ApiError = require("../exceptions/api-error");

const requiredCheck = (params) => {
  for (const key of Object.keys(params)) {
    if ([null, undefined, ""].includes(params[key])) {
      throw ApiError.BadRequest(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
    }
  }
}

const validateId = (id) => {
  if (!id || typeof id !== 'string' || !id.match(/^[0-9a-fA-F]{24}$/)) {
    throw ApiError.BadRequest("Invalid ID format");
  }
}

module.exports = {
  requiredCheck,
  validateId
}