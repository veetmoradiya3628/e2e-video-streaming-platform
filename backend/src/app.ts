import express from "express";
import itemRoutes from "./routes/itemRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import videoRoutes from "./routes/videoRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

// Routes
app.use("/api/items", itemRoutes);
app.use("/api/videos", videoRoutes)
app.use("/api/users", userRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
