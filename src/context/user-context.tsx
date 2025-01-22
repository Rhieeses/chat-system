'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import Cookies from 'js-cookie';

// Define a TypeScript interface for the User object
interface User {
	_id: String | any;
	username: string | null;
	fullName: string;
	email: string;
	profilePicture: string | null;
	activeStatus: 'offline' | 'online' | 'away';
	// Add other fields for the user
}

// Define the context type
interface UserContextType {
	user: User | null;
	receiverId: string | null;
	setReceiverId: (receiverId: string | null) => void;
	setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider = React.memo(({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [receiverId, setReceiverId] = useState<string | null>(null);

	useEffect(() => {
		const cookies = Cookies.get('user');

		if (cookies) {
			try {
				const sanitizedCookies = cookies.startsWith('j:') ? cookies.slice(2) : cookies;

				const parsedUser = JSON.parse(sanitizedCookies); // Parse the sanitized JSON string
				setUser(parsedUser); // Set the parsed user to the state
			} catch (error) {
				console.error('Error parsing user cookie:', error);
			}
		}
	}, [Cookies]);

	const value = useMemo(
		() => ({ user, setUser, receiverId, setReceiverId }),
		[user, setUser, receiverId, setReceiverId],
	);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
});

// Custom hook to use the UserContext
export function useUser(): UserContextType {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
}
