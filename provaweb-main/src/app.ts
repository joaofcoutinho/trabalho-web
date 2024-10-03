import express from "express";
import userRoutes from "./Routes/userRoutes";
import postRoutes from "./Routes/postRoutes";
import commentRoutes from "./Routes/commentRoutes";

const app = express();
app.use(express.json());

// Rotas
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

export default app;
