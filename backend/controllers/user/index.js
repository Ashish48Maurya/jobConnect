const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    const { first_name, last_name, email, password,role } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please enter a valid email" });
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ message: "Password must be at least 8 characters long and contain at least one letter and one number" });
    }
    const user = await User.findOne({ email });
    const user_token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    if (user) {
        return res.status(400).json({ message: "User already exists", token: user_token });
    }
    const fullName = `${first_name} ${last_name}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name:fullName, email, password:hashedPassword, role });
    const token = jwt.sign({ id: newUser?._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return res.status(201).json({ message: "User created successfully", user: newUser, token });
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
    return res.status(200).json({ message: "Login successful", user, token });
}

module.exports = {
    signup,
    login
}