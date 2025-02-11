const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

const UserService = require("../services/user.service");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserService.createUser(name, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.post("/request-otp", authController.requestOTP);
router.post("/verify-otp", authController.verifyOTPAndLogin);

module.exports = router;
