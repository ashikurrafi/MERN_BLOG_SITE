import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/adminModel.js"; // This should be a named import

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Admin.findById(decoded.id).select("-password");

      if (req.user) {
        next();
      } else {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
