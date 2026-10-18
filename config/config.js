import "dotenv/config";
const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/Portfolio"
};

if (!config.jwtSecret) {
  throw new Error("JWT_SECRET is missing. Configure it in your environment.");
}

export default config;
