const jwt = require("jsonwebtoken");
const OTPService = require("./otp.service");

class AuthService {
  static generateToken(mobile) {
    return jwt.sign({ mobile }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  static async loginWithOTP(mobile, enteredOTP) {
    const isValid = await OTPService.verifyOTP(mobile, enteredOTP);

    if (!isValid) {
      throw new Error("Invalid or expired OTP");
    }

    return this.generateToken(mobile); // Return JWT after successful OTP verification
  }
}

module.exports = AuthService;
