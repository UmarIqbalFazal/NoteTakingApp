import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Models/User.js";

// REGISTER / SIGNUP
export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    // generate JWT token immediately after signup
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// LOGIN
export async function login(req, res) {
  try {
    console.log("🔎 [AUTH] Login payload:", req.body); // debug

    const { email, password } = req.body;

    // find user
    const user = await User.findOne({ email });
    console.log("🔎 [AUTH] Found user (email):", user ? user.email : null);

    if (!user) {
      console.log("🔒 [AUTH] No user found for email:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔎 [AUTH] Password match result:", isMatch);

    if (!isMatch) {
      console.log("🔒 [AUTH] Password mismatch for user:", email);
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // optional: confirm JWT secret is present
    console.log("🔐 [AUTH] JWT_SECRET exists:", !!process.env.JWT_SECRET);

    // generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log("✅ [AUTH] Generated token (truncated):", token ? token.slice(0, 8) + "..." : null);

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("🔥 [AUTH] login error:", error);
    res.status(500).json({ error: error.message });
  }
}
