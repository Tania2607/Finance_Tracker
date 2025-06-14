const userModel = require('../db/userModel')
const { error, success } = require('../utils/handler')

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.send(error(400, "Email and password Required!!"));
        }
        // NOTE: For production, use password hashing!
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.send(error(401, "User Not Found!! Please Sign Up"));
        }
        return res.send(success(201, user));
    } catch (err) {
        return res.send(error(401, err.message));
    }
}

const signupContorller = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.send(error(401, "Enter Every Field!!!"));
        }
        // Check for duplicate email
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.send(error(409, "Email already registered"));
        }
        // NOTE: For production, use password hashing!
        const newUser = await userModel.create({ username, email, password });
        return res.send(success(201, newUser));
    } catch (err) {
        return res.send(error(401, err.message));
    }
}

const logoutController = async (req, res) => {
    // Not implemented
}

module.exports = {
    loginController,
    logoutController,
    signupContorller
}