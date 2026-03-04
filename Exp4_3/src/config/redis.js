import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    tls: true
  },
  password: process.env.REDIS_PASSWORD
});

redisClient.on("error", (err) => {
  console.log("Redis error:", err);
});

await redisClient.connect();

console.log("Redis connected");

export default redisClient;