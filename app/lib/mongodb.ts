import mongoose from "mongoose";

declare global {
	var mongoose: any;
}

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

const { MONGODB_URI } = process.env;

async function dbConnect() {
	if (!MONGODB_URI) {
		throw new Error("MONGODB_URI variable is not defined.");
	}

	if (cached.conn) {
		return cached.conn;
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};
		cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
			return mongoose;
		});
	}
	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

export default dbConnect;
