import { Response, Request } from 'express';
import Message from '../models/message-model';
import Convo from '../models/convo-model';
import { Types } from 'mongoose';

interface ApiRequest extends Request {
	body: {
		conversationId: string;
		senderId: string;
		receiverId: string;
		mediaUrl: string;
		message: string;
		messageType: 'text' | 'image' | 'video' | 'file';
	};
	query: {
		id: string;
	};
}

export const sendMessage = async (req: ApiRequest, res: Response): Promise<Response | any> => {
	try {
		const { conversationId, mediaUrl, message, messageType, receiverId, senderId } = req.body;

		//create convo function
		const parsedReceiverId = new Types.ObjectId(receiverId);
		const parsedSenderId = new Types.ObjectId(senderId);

		let convoId;

		if (!conversationId) {
			const createConvo = await Convo.create({
				participants: [
					{
						user: receiverId,
						unreadCount: 0,
					},
					{
						user: senderId,
						unreadCount: 0,
					},
				],
				type: 'single',
			});

			convoId = new Types.ObjectId(createConvo._id);
		} else {
			convoId = new Types.ObjectId(conversationId);
		}

		/** 
		if (!conversationId) {
			let isConvoExisting = await Convo.findOne({
				participants: {
					$all: [
						{ $elemMatch: { user: receiverId } },
						{ $elemMatch: { user: senderId } },
					],
				},
			});

			if (!isConvoExisting) {
				console.log('convo not existing');

				isConvoExisting = await Convo.create({
					participants: [
						{
							user: receiverId,
							unreadCount: 0,
						},
						{
							user: senderId,
							unreadCount: 0,
						},
					],
					type: 'single',
				});

				// Access the _id directly
				convoId = isConvoExisting?._id;
			}

			convoId = isConvoExisting?._id;
		}*/

		const newMessageData = {
			conversationId: convoId,
			senderId: parsedSenderId,
			receiverId: parsedReceiverId,
			messageType: messageType || 'text',
			mediaUrl: mediaUrl || null,
			message,
		};

		const sendMessage = await Message.create(newMessageData);

		await Convo.findByIdAndUpdate(convoId, {
			lastMessage: sendMessage._id,
			lastMessageCreatedAt: sendMessage.createdAt,
		});

		return res.status(200).json({ sucess: true, message: 'message sent', data: sendMessage });
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const getMessages = async (req: ApiRequest, res: Response): Promise<Response | any> => {
	try {
		const { id } = req.query;

		const conversationId = new Types.ObjectId(id);

		const messages = await Message.find({ conversationId });

		if (!messages) {
			return res.status(401).json({
				success: false,
				message: 'No messages found for this conversation',
			});
		}

		return res.status(200).json({
			success: true,
			message: 'messages fetched',
			data: messages,
		});
	} catch (error: any) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};
