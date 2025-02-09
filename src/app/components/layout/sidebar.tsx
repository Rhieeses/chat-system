'use client';

import { Input, Badge, Avatar, ScrollShadow, Skeleton } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { DateFormatter } from '@/app/utils/formatter';
import { useUser } from '@/context/user-context';
import getConvoList from '@/app/actions/get-convo-list';

const ConvoCard = ({ search }: { search: string }) => {
	const { setReceiverId } = useUser();
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

	if (error) {
		return <p>Error...</p>;
	}

	return (
		<>
			{convoList
				.filter((convoItem) =>
					convoItem.participants[0].user?.fullName
						.toLowerCase()
						.includes(search.toLowerCase()),
				)

				.map((convoItem) => {
					return (
						<div
							key={convoItem._id}
							onClick={() => {
								const userId = convoItem.participants[0].user._id;
								setReceiverId(userId);
								handleUrlChange(userId);
							}}
							className={`flex items-center gap-4 w-full h-fit p-3 rounded-2xl duration-200 cursor-pointer bg-gray-300/50`}>
							<Badge
								size='sm'
								isOneChar
								color='success'
								placement='bottom-right'>
								<Avatar
									size='lg'
									color='success'
									radius='lg'
									src={
										convoItem.participants[0].user.profilePicture ||
										'https://i.pravatar.cc/150?u=a042581f4e29026024d'
									}
								/>
							</Badge>
							<div className='w-full'>
								<h2 className='text-md font-[500] capitalize'>
									{convoItem.participants[0].user.fullName}
								</h2>
								<p className='text-sm text-gray-500 truncate max-w-[80%]'>
									{convoItem.lastMessage.message}
								</p>
							</div>
						</div>
					);
				})}
		</>
	);
};

const Sidebar = React.memo(() => {
	const [search, setSearch] = useState('');
	return (
		<aside className='flex flex-col gap-5 w-[25%] h-full border-r-[1px] border-color p-5'>
			<div className='flex items-center '>
				<h2 className='font-semibold text-2xl text-center '>Messages</h2>
			</div>
			<Input
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				classNames={{
					inputWrapper: 'w-full h-fit p-5 rounded-xl border-[1px] border-color bg-white',
				}}
				startContent={<i className='fa-solid fa-magnifying-glass fa-lg  mr-3'></i>}
				placeholder='Search'
			/>
			<ScrollShadow
				hideScrollBar
				size={10}
				className='flex flex-col h-full gap-3 p-1 overflow-y-scroll'>
				<ConvoCard search={search} />
			</ScrollShadow>
		</aside>
	);
});

export default Sidebar;
