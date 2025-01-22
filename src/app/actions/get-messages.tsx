'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

import axios from 'axios';

interface messagesSchema {
	_id: string;
	conversationId: string;
	message: string;
	senderId: string;
	receiverId: string;
	status: {
		deliverd: boolean;
		read: boolean;
	};
	createdAt: Date;
}

export default function getMessages({ conversationId }: any) {
	const [messages, setMessages] = useState<messagesSchema[] | any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const socketInstance: Socket = io('http://localhost:5000'); // Update the URL if needed
		const fetchMessages = async () => {
			setIsLoading(true);

			try {
				const response = await axios.get('/api/message/get-messages', {
					params: {
						id: conversationId,
					},
				});

				const userConvo: messagesSchema[] = await response.data.data;
				setMessages(userConvo);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setIsLoading(false);
			}
		};

		if (conversationId) {
			fetchMessages();

			socketInstance.on('message', (message: messagesSchema) => {
				if (message.conversationId === conversationId) {
					setMessages((prevMessages: messagesSchema[]) => [...prevMessages, message]);
				}
			});
		}

		return () => {
			socketInstance.disconnect();
		};
	}, [conversationId]);

	return {
		messages,
		isLoading,
		error,
	};
}

/**
 * const fetchMessages = async () => {
		try {
			const response = await axios.get('/api/message/get-messages', {
				params: {
					id: conversationId,
				},
			});

			const userConvo: messagesSchema[] = await response.data.data;
			setMessages(userConvo);
		} catch (error: any) {
			setError(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (conversationId) {
			fetchMessages();
			const intervalId = setInterval(fetchMessages, 2000);

			return () => clearInterval(intervalId);
		}
	}, [conversationId]);

 */
