const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Correct path to database connection

const OTP = sequelize.define("OTP", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mobile: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING(6),
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = OTP;
