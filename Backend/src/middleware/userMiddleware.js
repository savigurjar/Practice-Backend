const jwt = require("jsonwebtoken")
const User = require("../models/users")
const redisClient = require("../config/redis")


const userMidd = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) throw new Error("token is missing");

        const payload = jwt.verify(token, process.env.JWT_KEY);
        const { _id } = payload;
        if (!_id) throw new Error("Invalid payload ID");

        const result = await User.findById(_id);
        if (!result) throw new Error("User not found");

        // redis check for blocked token
        const IsBlocked = await redisClient.exists(`token:${token}`);
        if (IsBlocked) throw new Error("Invalid Token")

        req.result = result;
        next();

    } catch (err) {

    }
}
module.exports = userMidd;