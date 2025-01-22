import { Request, Response } from 'express';
import Convo from '../models/convo-model';
import { Types } from 'mongoose';

interface ApiRequest extends Request {
	cookies: {
		user: {
			_id: string;
		};
	};
	query: {
		id: string;
	};
}

export const fetchConvo = async (req: ApiRequest, res: Response): Promise<Response | any> => {
	try {
		const { id } = req.query;
		const userId = req.cookies.user._id;

		const receiverId = new Types.ObjectId(id);
		const senderId = new Types.ObjectId(userId);

		let convoData = await Convo.findOne({
			participants: {
				$all: [{ $elemMatch: { user: receiverId } }, { $elemMatch: { user: senderId } }],
			},
		}).populate({
			path: 'participants.user',
			match: { _id: receiverId },
			select: '_id fullName profilePicture activeStatus',
		});

		if (!convoData) {
			return res.status(200).json({
				success: true,
				message: 'Conversation started',
				data: convoData,
			});
		}
		return res.status(200).json({
			success: true,
			message: 'Conversation started',
			data: convoData,
		});
	} catch (error: any) {
		return res.status(500).json({
			sucess: false,
			message: 'Error in the server',
			error: error.message,
		});
	}
};

export const getConvoList = async (req: ApiRequest, res: Response): Promise<Response | any> => {
	try {
		const userId = req.cookies.user._id;
		const parsedUserId = new Types.ObjectId(userId);

		const parsedUserIdStr = parsedUserId.toString();

		const convoList = await Convo.find({
			participants: {
				$all: [{ $elemMatch: { user: parsedUserId } }],
			},
		})
			.populate({
				path: 'lastMessage',
				select: 'message status',
			})
			.populate({
				path: 'participants.user',
				match: { _id: { $ne: parsedUserId } },
				select: '_id fullName profilePicture activeStatus',
			})
			.sort({ lastMessageCreatedAt: -1 })
			.lean()
			.exec();

		const filteredConvoList = convoList.map((convo) => {
			const updatedParticipants = convo.participants.filter((participant) => {
				const userId = participant.user;
				return userId && userId.toString() !== parsedUserIdStr;
			});

			return {
				...convo,
				participants: updatedParticipants,
			};
		});

		return res.status(200).json({
			sucess: true,
			convoList: filteredConvoList,
			messsage: 'convo list fetched!',
		});
	} catch (error: any) {
		return res.status(500).json({
			sucess: false,
			message: 'Error in the server',
			error: error.message,
		});
	}
};
