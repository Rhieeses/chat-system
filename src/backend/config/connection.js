import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

export default async function connectionDB() {
	try {
		await mongoose.connect(MONGO_URL);
		console.log('Connected to MongoDB');
		console.log(mongoose.connection.name); // Log the name of the connected database
	} catch (error) {
		console.error('Failed to connect to MongoDB:', error);
	}
}
