const OTP = require("../models/otp.model");
const otpGenerator = require("otp-generator");
const { Op } = require("sequelize");

class OTPService {
  static async generateOTP(mobile) {
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // OTP expires in 2 minutes

    console.log(
      `🔹 Generating OTP: ${otp} for ${mobile}, expires at: ${expiresAt}`
    );

    try {
      const result = await OTP.create({ mobile, otp, expires_at: expiresAt });
      console.log("✅ OTP inserted successfully:", result);
    } catch (error) {
      console.error("❌ Error inserting OTP:", error);
    }

    return otp;
  }

  static async verifyOTP(mobile, enteredOTP) {
    const otpEntry = await OTP.findOne({
      where: {
        mobile,
        otp: enteredOTP,
        expires_at: { [Op.gt]: new Date() }, // Check if OTP is still valid
      },
    });

    return !!otpEntry; // Returns true if OTP is valid
  }
}

module.exports = OTPService;
