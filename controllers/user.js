const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signupUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let assignedRole = role || "customer";

    if (assignedRole === "admin" && (!req.user || req.user.role !== "admin")) {
      return res
        .status(403)
        .json({ error: "Only admins can create admin accounts" });
    }

    const newUser = await User.create({
      name,
      email,
      password,
      role: assignedRole,
    });
    const sendUser = {
      name,
      email,
    };

    res
      .status(201)
      .json({ message: "User created successfully", user: sendUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
