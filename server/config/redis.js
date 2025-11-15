require("dotenv").config();
const Redis = require("ioredis");

// Create Redis client
const redis = new Redis(process.env.REDIS_URL);

redis.on("connect", () => {
  console.log("Redis Connected!");
});

redis.on("error", (err) => {
  console.log("Redis Error:", err);
});

module.exports = redis;
