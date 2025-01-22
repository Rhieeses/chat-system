'use client';

import { Input, Badge, Avatar, ScrollShadow, Skeleton } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { DateFormatter } from '@/app/utils/formatter';
import { useUser } from '@/context/user-context';
import getConvoList from '@/app/actions/get-convo-list';

const ConvoCard = ({ search }: { search: string }) => {
	const { receiverId, setReceiverId } = useUser();
	const { convoList, isLoading, error } = getConvoList();

	const handleUrlChange = (receiverId: any) => {
		const currentUrl = window.location.href;
		const url = new URL(currentUrl);

		const baseUrl = `${url.protocol}//${url.host}`;

		const updatedUrl = `${baseUrl}/conversation/${receiverId}`;

		window.history.replaceState(null, '', updatedUrl);
	};

	if (isLoading) {
		return (
			<div className='max-w-[300px] w-full flex flex-col items-center gap-3'>
				{Array.from({ length: 5 }).map((_, index) => (
					<div
						key={index}
						className='w-full flex items-center gap-3'>
						<div>
							<Skeleton className='flex rounded-full w-12 h-12' />
						</div>
						<div className='w-full flex flex-col gap-2'>
							<Skeleton className='h-3 w-3/5 rounded-lg' />
							<Skeleton className='h-3 w-4/5 rounded-lg' />
						</div>
					</div>
				))}
			</div>
		);
	}

	if (convoList.length === 0 && isLoading === false) {
		return <div>No messages...</div>;
	}

	if (error) {
		return <p>Error...</p>;
	}

	return (
		<ScrollShadow
			hideScrollBar
			className='flex flex-col gap-1 overflow-scroll h-full'>
			{convoList
				.filter((convoItem) =>
					convoItem.participants[0].user?.fullName
						.toLowerCase()
						.includes(search.toLowerCase()),
				)

				.map((convoItem) => {
					return (
						<div
							onClick={() => {
								const userId = convoItem.participants[0].user._id;
								setReceiverId(userId);
								handleUrlChange(userId);
							}}
							className={`flex items-center gap-5 text-black w-full cursor-pointer rounded-2xl hover:shadow-[10px_20px_60px_-1px_rgb(211,211,211)] duration-200 lg:p-5 p-2 border-b-1 ${
								convoItem.lastMessage.status.isRead ? '' : 'bg-gray-200'
							}`}
							key={convoItem._id}>
							<Avatar
								showFallback
								size='md'
								src={
									convoItem.participants[0].user.profilePicture ||
									'https://i.pravatar.cc/150?u=a042581f4e29026024d'
								}
							/>
							<div className='lg:flex hidden flex-col justify-center gap-1 w-[80%]'>
								<div className='flex items-center justify-between'>
									<h1 className='text-lg'>
										{convoItem.participants[0].user.fullName}
									</h1>
									<h1 className='text-sm font-semibold'>
										{DateFormatter(convoItem.lastMessageCreatedAt)}
									</h1>
								</div>
								<p className='text-gray-500 text-xs w-[20rem] max-w-sm truncate overflow-hidden'>
									{convoItem.lastMessage.message}
								</p>
							</div>
						</div>
					);
				})}
		</ScrollShadow>
	);
};

const Sidebar = React.memo(() => {
	const [search, setSearch] = useState('');

	return (
		<aside className='border-r-[1px] border-gray-200 lg:h-[90%] h-[85%] text-black w-[20%] p-5 lg:pl-5 lg:pr-5 pl-1 pr-1 space-y-5'>
			<div className='flex lg:flex-row flex-col lg:gap-0 gap-5 items-center justify-between'>
				<h1 className='hidden lg:flex font-semibold text-2xl'>
					Messages <strong className='font-medium text-lg'>(04)</strong>
				</h1>

				<div className='lg:hidden flex'>
					<Badge
						size='md'
						color='danger'
						content={1}
						shape='circle'>
						<i className='bx bx-message-square-dots bx-md'></i>
					</Badge>
				</div>

				<i className='bx bx-edit bx-sm bx-border cursor-pointer hover:bg-gray-200 duration-200'></i>
			</div>
			<div className='lg:flex hidden'>
				<Input
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					radius='full'
					className='capitalize'
					placeholder='Search'
					endContent={<i className='bx bx-search-alt-2 bx-sm text-gray-500'></i>}
				/>
			</div>

			<ConvoCard search={search} />
		</aside>
	);
});

export default Sidebar;
