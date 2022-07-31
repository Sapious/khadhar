const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
	{
		firstName: { type: String, maxlength: 128 },
		lastName: { type: String, maxlength: 128 },
		email: {
			type: String,
			unique: true,
			index: true,
			lowercase: true,
			required: true,
		},
		password: { type: String, minlength: 8 },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
