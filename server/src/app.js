import express from "express";
const app = express();



app.get("/test", (req, res) => {
  res.send("Test API is working [GET]");
});

export default app;
