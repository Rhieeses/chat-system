import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		userName: {
			type: String,
			unique: true,
			trim: true,
			default: null,
		},
		fullName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		activeStatus: {
			type: String,
			enum: ['online', 'offline', 'away'],
			default: 'offline',
		},
		profilePicture: {
			type: String,
			default: '',
		},
		friends: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users',
				default: [],
			},
		],

		friendRequest: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Users',
				default: [],
			},
		],
	},

	{
		timestamps: true,
	},
);

const User = mongoose.model('Users', userSchema);

export default User;
