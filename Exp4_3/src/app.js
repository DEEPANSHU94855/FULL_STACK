import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import seatRoutes from "./routes/seat.routes.js";

const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Seat Locking API is running 🚀");
});

//app.use(
// rateLimit({
//   windowMs: 60 * 1000,
//   max: 100,
// })
//);

app.use("/api/seats", seatRoutes);

export default app;