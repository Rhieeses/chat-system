'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

interface User {
	_id: string;
	fullName: string;
	profilePicture: string | null;
	activeStatus: 'offline' | 'online' | 'away';
}

interface ConvoSchema {
	_id: string;
	lastMessageCreatedAt: Date;
	participants: { user: User; unreadCount: number }[];
	lastMessage: {
		message: string;
		createdAt: Date;
		status: { isRead: boolean; delivered: boolean };
	};
}

export default function getConvoList() {
	const [convoList, setConvoList] = useState<ConvoSchema[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState(null);

	const fetchConvoList = async () => {
		try {
			const response = await axios.get('/api/convo/convo-list', {
				withCredentials: true,
			});

			const convoList: ConvoSchema[] = await response.data.convoList;

			setConvoList(convoList);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const socketInstance: Socket = io('http://localhost:5000'); // Update the URL if needed

		fetchConvoList();

		socketInstance.on('message', () => {
			fetchConvoList();
		});

		return () => {
			socketInstance.disconnect();
		};
	}, []);

	return {
		convoList,
		isLoading,
		error,
	};
}
