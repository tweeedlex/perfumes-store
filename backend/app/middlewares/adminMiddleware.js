const jwt = require("jsonwebtoken");

module.exports = function adminAuth(req, res, next) {
  const { ApiError } = req;
  const token = req.cookies?.adminToken;
  console.log("cookies", req.cookies);

  if (!token) return next(ApiError.UnauthorizedError("Admin token missing"));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { id: payload.adminId, email: payload.email };
    next();
  } catch (err) {
    next(ApiError.UnauthorizedError("Invalid or expired admin token"));
  }
};
