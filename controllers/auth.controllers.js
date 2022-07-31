const userModels = require("../models/user.models");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
	try {
		const existUser = await userModels.findOne({ email: req.body.email });
		if (!existUser) return res.status(401).json("Wrong Email/Password");

		const validPassword = await bcryptjs.compare(
			req.body.password,
			existUser.password
		);
		if (!validPassword) return res.status(401).json("Wrong Email/Password");

		const token = jwt.sign(
			{ _id: existUser._id, email: existUser.email },
			"azety15864",
			{ expiresIn: "2 days" }
		);
		return res.status(200).json({ token: token, user: existUser });
	} catch (err) {
		return res.status(500).json(err);
	}
};

const register = async (req, res) => {
	try {
		const exitUser = await userModels.findOne({ email: req.body.email });
		if (exitUser) return res.status(422).json("Email already exist");

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(req.body.password, salt);

		const newUser = new userModels({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		return res.status(200).json(savedUser);
	} catch (err) {
		return res.status(500).json(err);
	}
};

module.exports.register = register;
module.exports.login = login;
