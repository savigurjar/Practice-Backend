const User = require("../models/users")
const validUser = require("../utils/validator")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const redisClient = require("../config/redis")

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
        req.body.role = 'user';

        // create user
        const user = await User.create(req.body);

        // generate token
        const token = jwt.sign({ _id: user._id, emailId: emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '8h' });

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
        // validate the token
        const { token } = req.cookies;
        if (!token) throw new Error("Token is missing");

        // token add kar denge redis ke blacklist
       const payload = jwt.verify(token, process.env.JWT_KEY);

        await redisClient.set(`token:${token}`, "Blocked");


        await redisClient.expireAt(`token:${token}`, payload.exp);


        // cookies clear 
        res.cookie("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires: new Date(0)
        });

        res.status(200).send("logout successfully");

    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
}

const getProfile = async (req, res) => {
    try {
        res.status(200).send(req.result);
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}

const adminRegister = async (req, res) => {
    try {
        // validate the data
        await validUser(req.body);

        const { firstName, emailId, password } = req.body;

        // check existing user
        const userExist = await User.findOne({ emailId });
        if (userExist) throw new Error("User already exists");

        // hash password
        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'admin';

        // create user
        const user = await User.create(req.body);

        // generate token
        const token = jwt.sign({ _id: user._id, emailId: emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '8h' });

        // set cookie
        res.cookie('token', token, {
            maxAge: 8 * 60 * 60 * 1000, // match token expiry
        });

        res.status(201).send("User registered");

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}

module.exports = { register, login, logout, getProfile ,adminRegister};
