const bcryptjs = require("bcryptjs");

const numSaltRounds = process.env.APP_ENV === "dev" ? 1 : 12;

const User = require("../models/User");

module.exports.allUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        return res.status(200).json({users: users});
    } catch (error) {
        return res.status(400).json({ error });
    }
};

module.exports.findUserById = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        return res.status(200).json({user: user});
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.addUser = async (req, res) => {
    try {
        delete req.body._id;
        const hashPassword = await bcryptjs.hash(req.body.password, numSaltRounds);
        const user = new User({ ...req.body, password: hashPassword });
        await user.save();
        return res.status(201).json({ message: "User has been created" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.updateUser = async (req, res) => {
    try {
        await User.updateOne({ _id: req.params.id },{ ...req.body, _id: req.params.id });
        return res.status(200).json({ message: "User has been modified" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        await User.deleteOne({ _id: req.params.id});
        return res.status(200).json({ message: "User has been deleted" });
    } catch (error) {
        return res.status(400).json({ error });
    }
}