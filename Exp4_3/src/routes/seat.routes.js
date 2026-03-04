import express from "express";
import {
  lockSeatHandler,
  bookSeatHandler,
  getSeatStatusHandler,
} from "../controllers/seat.controller.js";

const router = express.Router();

// Lock a seat
router.post("/lock", lockSeatHandler);

// Confirm booking
router.post("/book", bookSeatHandler);

// Get seat status
router.get("/:seatId", getSeatStatusHandler);

export default router;