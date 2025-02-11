const OTPService = require("../services/otp.service");
const AuthService = require("../services/auth.service");

exports.requestOTP = async (req, res) => {
  try {
    const { mobile } = req.body;
    const otp = await OTPService.generateOTP(mobile);

    // Here, you would send the OTP via SMS or Email
    console.log(`Generated OTP for ${mobile}: ${otp}`);

    res.json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyOTPAndLogin = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const token = await AuthService.loginWithOTP(mobile, otp);

    res.json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
