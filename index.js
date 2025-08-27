import app from "./app.js";
import dotenv from "dotenv";
import { connectDB, sequelize } from "./config/db.config.js";

dotenv.config();
const PORT = process.env.PORT || 7000;

// Connect to DB
await connectDB();

// Sync Tables
// sequelize.sync({ alter: true })
//   .then(() => console.log("✅ Tables synced"))
//   .catch((err) => console.error("❌ Error syncing tables:", err));


app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
