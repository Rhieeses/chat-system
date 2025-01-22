'use client';
import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import axios from 'axios';

interface User {
	_id: String | any;
	username: string | null;
	fullName: string;
	email: string;
	profilePicture: string | null;
	activeStatus: 'offline' | 'online' | 'away';
}

interface UserContextType {
	receiverInfo: User | null;
	conversationId: string | any;
}

const ReceiverContext = createContext<UserContextType | undefined>(undefined);

export const ReceiverProvider = ({
	children,
	receiverId,
}: {
	children: ReactNode;
	receiverId: string | unknown;
}) => {
	const [receiverInfo, setReceiverInfo] = useState<User | null>(null);
	const [conversationId, setConversationId] = useState<string | any>(null);
	const [loadingInfo, setLoadingInfo] = useState<boolean>(false);
	const [errorInfo, setErrorInfo] = useState<string>();

	useEffect(() => {
		async function fetchuser() {
			setLoadingInfo(true);
			try {
				const response = await axios.get('/api/user/user-info', {
					params: {
						id: receiverId,
					},
					withCredentials: true,
				});

				const receiverInfo: User = response.data.data[0];
				const conversationId: string | any = response.data.convoId;

				setConversationId(conversationId);
				setReceiverInfo(receiverInfo);
			} catch (error: any) {
				console.error('Error fetching user info:', error.message);
				setErrorInfo(error.message);
			} finally {
				setLoadingInfo(false);
			}
		}
		if (receiverId) {
			fetchuser();
		}
	}, [receiverId]);

	const value = useMemo(() => ({ conversationId, receiverInfo }), [conversationId, receiverInfo]);

	return <ReceiverContext.Provider value={value}>{children}</ReceiverContext.Provider>;
};

export function useReceiver(): UserContextType {
	const context = useContext(ReceiverContext);
	if (context === undefined) {
		throw new Error('Receiver Info must be used within a ReceiverProvider');
	}
	return context;
}
