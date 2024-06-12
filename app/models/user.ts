import mongoose from "mongoose";
import { User } from "../types";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = new mongoose.Schema<User>({
	username: {
		type: String,
		required: [true, "Username is required."],
		unique: true,
		minLength: [3, "Username needs to be at least 3 characters long."],
	},
	name: {
		type: String,
		minLength: [3, "Name needs to be at least 3 characters long."],
	},
	passwordHash: {
		type: String,
		required: [true, "Password is required."],
	},
	upvoted: [{ type: String }],
	superUser: {
		type: Boolean,
		required: true,
	},
});

userSchema.set("toJSON", {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.passwordHash;
	},
});

userSchema.plugin(mongooseUniqueValidator, {
	message: "{VALUE} already exists.",
});

const userModel = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default userModel;
