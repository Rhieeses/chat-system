import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Users',
					required: true,
				},

				unreadCount: {
					type: Number,
					default: 0,
				},
			},
		],
		lastMessage: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Messages',
			required: false,
		},

		lastMessageCreatedAt: {
			type: Date,
			required: false,
		},
		type: {
			type: String,
			enum: ['single', 'group'],
			default: 'single',
		},
	},
	{
		timestamps: true,
	},
);

const Convo = mongoose.model('Conversations', conversationSchema);

export default Convo;
