import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,       // database
  process.env.DB_USER,       // username
  process.env.DB_PASSWORD,   // password
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false, // console me raw SQL queries na dikhay
  }
);


export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected with Sequelize");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1); // agar db connect na ho to app band ho jaye
  }
};
