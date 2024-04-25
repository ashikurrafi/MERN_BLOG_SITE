const express = require("express");

const app = express();

app.get("/test", (req, res) => {
  res.send("Test API is working [GET]");
});

// // Client error handling
// app.use((req, res, next) => {
//   next(createError(404, "Route not found"));
// });

// // Server error handling -> all the error
// app.use((err, req, res, next) => {
//   return errorResponse(res, { statusCode: err.status, message: err.message });
// });

module.exports = app;
