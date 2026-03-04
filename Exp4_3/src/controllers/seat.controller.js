import {
  lockSeat,
  confirmBooking,
  getSeatStatus,
} from "../services/seat.service.js";

// Lock Seat Controller
export const lockSeatHandler = async (req, res) => {
  try {
    const { seatId, userId } = req.body;
    const result = await lockSeat(seatId, userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

// Confirm Booking Controller
export const bookSeatHandler = async (req, res) => {
  try {
    const { seatId, lockToken } = req.body;
    const result = await confirmBooking(seatId, lockToken);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Seat Status Controller
export const getSeatStatusHandler = async (req, res) => {
  try {
    const { seatId } = req.params;
    const result = await getSeatStatus(seatId);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};