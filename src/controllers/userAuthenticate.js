const User = require("../models/users")
const validUser = require("../utils/validator")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        // validate the data
        await validUser(req.body);

        const { firstName, emailId, password } = req.body;

        // check existing user
        const userExist = await User.findOne({ emailId });
        if (userExist) throw new Error("User already exists");

        // hash password
        req.body.password = await bcrypt.hash(password, 10);

        // create user
        const user = await User.create(req.body);

        // generate token
        const token = jwt.sign({ _id: user._id, emailId: emailId }, process.env.JWT_KEY, { expiresIn: '8h' });

        // set cookie
        res.cookie('token', token, {
            maxAge: 8 * 60 * 60 * 1000, // match token expiry
        });

        res.status(201).send("User registered");

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}

const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) throw new Error("Invalid credentials");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error("Invalid credentials");

        const token = jwt.sign({ _id: user._id, emailId: emailId }, process.env.JWT_KEY, { expiresIn: '8h' });

        res.cookie('token', token, {
            maxAge: 8 * 60 * 60 * 1000,
        });

        res.status(200).send("Login successful");

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}

const logout = async (req, res) => {
    try {

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}

module.exports = { register, login, logout }

