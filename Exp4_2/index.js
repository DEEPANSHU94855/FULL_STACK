import express from "express";
import { connectDB } from "./config/db.js";
import cardRoutes from "./routes/cards.routes.js";
const app = express();

app.use(express.json());
connectDB();
app.use("/api/cards", cardRoutes);

app.listen(3000, () =>
    console.log('Server is running on port 3000')
);

// http://localhost:3000/api/cards/create