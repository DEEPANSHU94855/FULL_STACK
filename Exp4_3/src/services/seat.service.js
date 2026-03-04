import redis from "../config/redis.js";
import { v4 as uuidv4 } from "uuid";

const LOCK_TTL = parseInt(process.env.SEAT_LOCK_TTL || "300");

// 🔹 Lock Seat
export const lockSeat = async (seatId, userId) => {
  // Check if already booked
  const isBooked = await redis.get(`seat:booked:${seatId}`);
  if (isBooked) {
    throw new Error("Seat already booked");
  }

  const lockKey = `seat:lock:${seatId}`;
  const lockValue = `${userId}:${uuidv4()}`;

  const isLocked = await redis.set(
    lockKey,
    lockValue,
    "NX",
    "EX",
    LOCK_TTL
  );

  if (!isLocked) {
    throw new Error("Seat already locked");
  }

  return {
    seatId,
    lockToken: lockValue,
    expiresIn: LOCK_TTL,
  };
};

// 🔹 Confirm Booking
export const confirmBooking = async (seatId, lockToken) => {
  const lockKey = `seat:lock:${seatId}`;
  const storedToken = await redis.get(lockKey);

  if (!storedToken || storedToken !== lockToken) {
    throw new Error("Invalid or expired lock");
  }

  // Delete lock
  await redis.del(lockKey);

  // Mark as booked permanently
  await redis.set(`seat:booked:${seatId}`, "true");

  return { seatId, status: "BOOKED" };
};

// 🔹 Get Seat Status
export const getSeatStatus = async (seatId) => {
  const isBooked = await redis.get(`seat:booked:${seatId}`);
  if (isBooked) {
    return { seatId, status: "BOOKED" };
  }

  const isLocked = await redis.get(`seat:lock:${seatId}`);
  if (isLocked) {
    return { seatId, status: "LOCKED" };
  }

  return { seatId, status: "AVAILABLE" };
};