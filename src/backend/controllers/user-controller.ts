import { Request, Response } from 'express';
import { Types } from 'mongoose'; // Correct import for ObjectId
import User from '../models/user-model';
import Convo from '../models/convo-model';

const secretKey = process.env.SECRET_KEY as string;

interface ApiRequest extends Request {
	query: {
		id: string;
		limit: string;
	};
}

export const friendSuggestion = async (req: ApiRequest, res: Response): Promise<Response | any> => {
	try {
		const { id, limit } = req.query;
		const parsedLimit = parseInt(limit, 10);
		const objectId = new Types.ObjectId(id);

		const suggestionList = await User.aggregate([
			{
				$match: {
					_id: { $ne: objectId },
				},
			},
			{ $sample: { size: parsedLimit } },
			{
				$project: {
					_id: 1,
					fullName: 1,
					email: 1,
					profilePicture: 1,
				},
			},
		]);
		return res.status(200).json({
			sucess: true,
			listData: suggestionList,
			message:
				suggestionList.length > 0
					? 'Friend suggestion fetched!'
					: 'No friend suggestion available',
		});
	} catch (error: any) {
		return res.status(500).json({ sucess: false, message: error.message });
	}
};

export const directMessageInfo = async (
	req: ApiRequest,
	res: Response,
): Promise<Response | any> => {
	const user = req.cookies.user;

	if (!user) {
		return res.status(401).json({ message: 'No token provided' });
	}

	try {
		const { id } = req.query;
		const receiverId = new Types.ObjectId(id);
		const senderId = new Types.ObjectId(String(user._id));

		const userInfo = await User.find({ _id: receiverId })
			.select('_id fullName userName activeStatus profilePicture')
			.lean();

		let conversationId;

		let isConvoExisting = await Convo.findOne({
			participants: {
				$all: [{ $elemMatch: { user: receiverId } }, { $elemMatch: { user: senderId } }],
			},
		}).select('_id');

		if (isConvoExisting) {
			conversationId = isConvoExisting._id;
		}
		return res.status(200).json({
			sucess: true,
			data: userInfo,
			convoId: conversationId || null,
			message:
				userInfo.length > 0
					? 'user information fetched!'
					: 'No information about this user is fetched.',
		});
	} catch (error: any) {
		return res.status(500).json({ sucess: false, message: error.message });
	}
};
