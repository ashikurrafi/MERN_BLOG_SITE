import express from "express";
import morgan from "morgan";
import cors from "cors";
import storyRoutes from "./routes/storyRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/test", (req, res) => {
  res.send("Test API is working [GET] <br/> Hello, World!");
});
app.get("/", (req, res) => {
  res.send("Home page");
});

app.use("/api/stories", storyRoutes);
app.use("/api/admin", adminRoutes);

// Error Handling Middleware
app.use(errorHandler);

export default app;
