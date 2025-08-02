const ApiError = require("../exceptions/api-error");

const requiredCheck = (params, required) => {
  for (const key of Object.keys(required)) {
    if ([null, undefined, ""].includes(params[key])) {
      throw ApiError.BadRequest(`${key.charAt(0).toUpperCase() + key.slice(1)} is required`);
    }
  }
}

module.exports = {
  requiredCheck
}