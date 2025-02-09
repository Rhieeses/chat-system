'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Avatar, Button, Spinner } from '@nextui-org/react';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/navigation';

interface User {
	_id: number;
	fullName: string;
	email: string;
	profilePicture: string | undefined;
}

const SuggestionCard = () => {
	const { user } = useUser();
	const router = useRouter();
	const [isAdded, setisAdded] = useState<boolean>(false);
	const [suggestions, setSuggetion] = useState<User[] | null>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [limit, setLimit] = useState<number>(5);
	const [error, setError] = useState<string>();

	useEffect(() => {
		const fetchSuggestions = async () => {
			setLoading(true);
			try {
				const response = await axios.get('/api/user/friend-suggestion', {
					params: {
						id: user?._id,
						limit: limit,
					},
				});
				const usersData: User[] = await response.data.listData;
				setSuggetion(usersData);
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};
		fetchSuggestions();
	}, []);

	const handleSuggestion = (id: number) => {
		const currentUrl = window.location.href;
		const url = new URL(currentUrl);

		const baseUrl = `${url.protocol}//${url.host}`;

		const updatedUrl = `${baseUrl}/conversation/${id}`;

		router.push(updatedUrl);
	};

	if (loading) {
		return <Spinner />;
	}

	if (!suggestions || suggestions.length === 0) {
		return <p>No suggestions available</p>;
	}

	if (error) return <p>Error: {error}</p>;

	return (
		<div className='flex flex-col gap-3'>
			{suggestions.length > 0 ? (
				suggestions.map((user) => (
					<Card
						key={user._id}
						className='border-1'>
						<CardHeader className='justify-between'>
							<div className='flex gap-5'>
								<Avatar
									isBordered
									radius='full'
									size='md'
									src={
										user.profilePicture ||
										'https://nextui.org/avatars/avatar-1.png'
									}
								/>
								<div className='flex flex-col gap-1 items-start justify-center'>
									<h4 className='text-small capitalize font-semibold leading-none text-default-600'>
										{user.fullName}
									</h4>
									<h5 className='text-small tracking-tight text-default-400'>
										{user.email}
									</h5>
								</div>
							</div>
							<div className='flex items-center gap-1'>
								<Button
									isIconOnly
									onPress={() => handleSuggestion(user._id)}
									className=''>
									<i className='bx bxs-message-dots bx-sm '></i>
								</Button>
								<Button
									className={
										isAdded
											? 'bg-transparent text-foreground border-default-200'
											: ''
									}
									color='primary'
									radius='full'
									size='sm'
									variant={isAdded ? 'bordered' : 'solid'}
									onPress={() => setisAdded(!isAdded)}>
									{isAdded ? 'Cancel friend request' : 'Add friend'}
								</Button>
							</div>
						</CardHeader>
						<CardBody className='px-3 py-0 text-small text-default-400'>
							<p>
								Frontend developer and UI/UX enthusiast. Join me on this coding
								adventure!
							</p>
						</CardBody>
					</Card>
				))
			) : (
				<p>No suggestions available</p>
			)}
		</div>
	);
};

export default SuggestionCard;
