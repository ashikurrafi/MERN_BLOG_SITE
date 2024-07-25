import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    const { statusCode, message } = err;
    return res
      .status(statusCode)
      .json(new ApiResponse(statusCode, null, message));
  }

  console.error(err.stack);
  res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
};

export { errorHandler };
