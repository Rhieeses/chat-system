import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
	{
		conversationId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Conversations',
			required: true,
		},
		senderId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
		},
		receiverId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
		},
		messageType: {
			type: String,
			enum: ['text', 'image', 'video', 'file'],
			default: 'text',
		},
		mediaUrl: {
			type: String,
			required: false,
			default: null,
		},
		status: {
			delivered: { type: Boolean, default: false },
			isRead: { type: Boolean, default: false },
		},

		message: {
			type: String,
			required: true,
			trim: true,
			minLength: [1, 'Message must be at least 3 characters long'],
		},
	},
	{
		timestamps: true,
	},
);

const Message = mongoose.model('Messages', messageSchema);

export default Message;
