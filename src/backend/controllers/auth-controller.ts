import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user-model';

const secretKey = process.env.SECRET_KEY as string;

export const SignUp = async (req: Request, res: Response): Promise<Response | any> => {
	try {
		const { userName, fullName, email, password } = req.body;
		const isExistingUser = await User.findOne({ email });
		const isExistingUsername = await User.findOne({ userName });

		if (isExistingUser) {
			return res.status(400).json({ emailError: 'The email already exists' });
		}

		if (isExistingUsername) {
			return res
				.status(401)
				.json({ userNameError: 'The username already exist pick another' });
		}
		const hashedPassword = await bcrypt.hash(password, 15);

		const newUser = await User.create({ userName, fullName, email, password: hashedPassword });
		res.status(200).json({ sucess: true, data: newUser });
	} catch (error: any) {
		res.status(500).json({ sucess: false, message: error.message });
	}
};

export const Logout = async (req: Request, res: Response): Promise<Response | any> => {
	try {
		res.cookie('token', '', {
			maxAge: 0,
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});

		res.status(200).json({ message: 'Logged out successfully' });
	} catch (error) {
		console.error('Error during logout:', error);
		res.status(500).json({ error: 'Something went wrong during logout' });
	}
};

export const LogIn = async (req: Request, res: Response): Promise<Response | any> => {
	try {
		const { email, password } = req.body;
		const checkUser = await User.findOne({ email });
		if (!checkUser) {
			return res.status(400).json({ message: 'The email or password is incorrect' });
		}
		const checkPassword = await bcrypt.compare(password, checkUser.password);

		if (!checkPassword) {
			return res.status(400).json({ message: 'Email or password is incorrect!' });
		}

		const userToken = jwt.sign({ userId: checkUser._id }, secretKey, {
			expiresIn: '2h',
		});

		const loggedUser = await User.findOneAndUpdate(
			{
				_id: checkUser._id,
			},
			{
				$set: {
					activeStatus: 'online',
				},
			},
			{
				new: true,
			},
		).select('_id fullName userName email activeStatus profilePicture');

		res.cookie('token', userToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 5 * 60 * 60 * 1000,
			sameSite: 'strict',
		});

		res.cookie('user', loggedUser, {
			maxAge: 5 * 60 * 60 * 1000,
		});

		res.status(200).json({ sucess: true, token: userToken });
	} catch (error: any) {
		res.status(500).json({ success: false, message: error.message });
	}
};
