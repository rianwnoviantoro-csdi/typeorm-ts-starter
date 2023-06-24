import "dotenv/config";

export default {
  APP_ENV: process.env.APP_ENV || "development",
  APP_PORT: process.env.APP_PORT || 3000,
  APP_HOST: process.env.APP_HOST || "localhost",
  SECRET_KEY: process.env.S_KEY || "<SeCr3t_kEy>",
};
