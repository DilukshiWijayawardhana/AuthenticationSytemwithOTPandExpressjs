const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

// ✅ Import models before syncing
const OTP = require("./models/otp.model");

// Import Routes
const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(express.json());
app.use(cors());

// Update route if needed
app.use("/api/auth", authRoutes);

// Sync Database and Start Server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    await sequelize.sync({ force: false, alter: false }); // Avoid schema modifications
    console.log("✅ Database synced.");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();

module.exports = app;
