const User = require("../models/user.model");
const bcrypt = require("bcrypt");

class UserService {
  static async createUser(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ name, email, password: hashedPassword });
  }

  static async findUserByEmail(email) {
    return await User.findOne({ where: { email } });
  }
}

module.exports = UserService;
