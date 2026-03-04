import { createClient } from "redis";

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  },
  password: process.env.REDIS_PASSWORD
});

redisClient.on("error", (err) => {
  console.log("Redis error:", err);
});

await redisClient.connect();

export default redisClient;
