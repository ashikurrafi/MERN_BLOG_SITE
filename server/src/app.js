import express from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("Test API is working [GET]");
});

export default app;
