'use client';
import {
	User,
	Input,
	Avatar,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
	ScrollShadow,
	Chip,
	Skeleton,
} from '@nextui-org/react';
import { TimeFormatter } from '@/app/utils/formatter';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUser } from '@/context/user-context';
import { ReceiverProvider, useReceiver } from '@/context/receiver-context';
import getMessages from '@/app/actions/get-messages';
import SendMessageInput from './send-message';

const items = [
	{
		key: 'sad',
		label: '😀',
	},
	{
		key: 'happy',
		label: '😀',
	},
	{
		key: 'angry',
		label: '😀',
	},
	{
		key: 'disgust',
		label: '😀',
	},
];

interface User {
	_id: string;
	fullName: string;
	profilePicture: string | null;
	activeStatus: 'offline' | 'online' | 'away';
}

const messageSchema = z.object({
	conversationId: z.string().optional(),
	senderId: z.string(),
	receiverId: z.string(),
	mediaUrl: z.string().optional(),
	message: z.string().min(1, { message: '' }).max(250),
	messageType: z.string().optional(),
});

const ReceiverUser = () => {
	const { receiverInfo } = useReceiver();

	return (
		<div className='flex items-center justify-between lg:p-5 p-3 border-b-1'>
			{receiverInfo ? (
				<User
					classNames={{
						name: 'capitalize text-lg font-medium',
					}}
					avatarProps={{
						size: 'lg',
						src:
							receiverInfo?.profilePicture ||
							'https://i.pravatar.cc/150?u=a04258114e29026702d',
					}}
					description={
						<Chip
							className={`${
								receiverInfo?.activeStatus === 'online'
									? 'text-green-500'
									: receiverInfo?.activeStatus === 'offline'
									? 'text-red-500'
									: 'text-orange-500'
							} border-none capitalize`}
							variant='dot'
							color={
								receiverInfo?.activeStatus === 'online'
									? 'success'
									: receiverInfo?.activeStatus === 'offline'
									? 'danger'
									: receiverInfo?.activeStatus === 'away'
									? 'warning'
									: 'default'
							}>
							{receiverInfo?.activeStatus}
						</Chip>
					}
					name={receiverInfo?.fullName}
				/>
			) : (
				<div className='max-w-[300px] w-full flex items-center gap-3'>
					<div>
						<Skeleton className='flex rounded-full w-12 h-12' />
					</div>
					<div className='w-full flex flex-col gap-2'>
						<Skeleton className='h-3 w-3/5 rounded-lg' />
						<Skeleton className='h-3 w-4/5 rounded-lg' />
					</div>
				</div>
			)}

			<div className='flex items-center lg:gap-5 gap-1'>
				<i className='bx bx-phone bx-sm cursor-pointer hover:text-gray-500 duration-200'></i>
				<i className='bx bx-dots-horizontal-rounded bx-sm cursor-pointer hover:text-gray-300 duration-200'></i>
			</div>
		</div>
	);
};

const Messages = React.memo(({ userSessionId }: { userSessionId: string }) => {
	const { receiverInfo, conversationId } = useReceiver();

	const { messages, isLoading, error } = getMessages({ conversationId });

	const messageScrollRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (messageScrollRef.current) {
			messageScrollRef.current.scrollTop = messageScrollRef.current.scrollHeight;
		}
	}, [messages]);

	if (isLoading) {
		return (
			<div className='h-full w-full flex flex-col items-end justify-end bg-white p-5'>
				{Array.from({ length: 5 }).map((_, index) => (
					<React.Fragment key={index}>
						<div className='w-full flex items-end justify-end gap-3'>
							<div className='w-1/3 flex items-center gap-2 bg-white'>
								<div className='w-full flex flex-col items-end gap-2'>
									<Skeleton className='h-3 w-3/5 rounded-lg' />
									<Skeleton className='h-3 w-4/5 rounded-lg' />
								</div>
								<div>
									<Skeleton className='flex rounded-full w-12 h-12' />
								</div>
							</div>
						</div>

						<div className='w-full flex items-start justify-start gap-3'>
							<div className='w-1/3 flex items-center gap-2 bg-white'>
								<div>
									<Skeleton className='flex rounded-full w-12 h-12' />
								</div>
								<div className='w-full flex flex-col gap-2'>
									<Skeleton className='h-3 w-3/5 rounded-lg' />
									<Skeleton className='h-3 w-4/5 rounded-lg' />
								</div>
							</div>
						</div>
					</React.Fragment>
				))}
			</div>
		);
	}

	return (
		<ScrollShadow
			ref={messageScrollRef}
			hideScrollBar
			className='convo-contents flex flex-col justify-end gap-2 w-full p-5 h-[100%] overflow-y-scroll lg:text-base text-xs'>
			{messages?.length > 0 && !isLoading ? (
				messages.map((messageItem: any) => {
					const style = `${
						messageItem.senderId === userSessionId
							? 'sent-you flex items-end justify-end gap-2'
							: 'received flex items-center gap-2'
					}`;

					return (
						<div
							key={messageItem._id}
							className={`group ${style} cursor-pointer`}>
							{messageItem.senderId !== userSessionId && (
								<div className='flex items-center gap-2'>
									<Avatar
										src='https://i.pravatar.cc/150?u=a042581f4e29026024d'
										className='lg:size-12 w-[3.5rem] h-[2rem] '
									/>
									<div className='p-3 pl-5 pr-5 rounded-3xl  bg-blue-200'>
										<p>{messageItem.message}</p>
									</div>
									<span className='group-hover:opacity-100 opacity-0 duration-200 text-gray-400 text-sm'>
										{TimeFormatter(messageItem.updatedAt)}
									</span>
								</div>
							)}

							{messageItem.senderId === userSessionId && (
								<div className='flex items-center gap-2'>
									<div className='p-3 pl-5 pr-5 rounded-3xl order-last bg-gray-200'>
										<p>{messageItem.message}</p>
									</div>

									<span className=' group-hover:opacity-100 opacity-0 duration-200 text-gray-400 text-sm'>
										{TimeFormatter(messageItem.updatedAt)}
									</span>
								</div>
							)}
						</div>
					);
				})
			) : (
				<div className='w-full h-full flex justify-center p-10'>
					<div className='flex flex-col gap-2 items-center'>
						<Avatar
							src={
								receiverInfo?.profilePicture ||
								'https://i.pravatar.cc/150?u=a042581f4e29026024d'
							}
							className='lg:size-20 w-[3.5rem] h-[2rem]'
						/>
						<h1 className='capitalize text-xl'>{receiverInfo?.fullName}</h1>

						<div className='p-3 rounded-md bg-gray-200'>
							Messages and calls are secured with end-to-end encryption. Learn More
						</div>
					</div>
				</div>
			)}
		</ScrollShadow>
	);
});

const MessagesContent = React.memo(({ receiverIdUrl }: any) => {
	const { user, receiverId } = useUser();
	const [isLoading, setLoading] = useState<boolean>(true);
	const [receiverIds, setReceiverIds] = useState<string | null>(null);

	useEffect(() => {
		const fetchReceiverId = () => {
			setLoading(true);
			if (receiverId) {
				setReceiverIds(receiverId);
			} else {
				setReceiverIds(receiverIdUrl);
			}
			setLoading(false); // Set loading to false once done
		};

		fetchReceiverId();
	}, [receiverId, receiverIdUrl]);

	const memoizedIdProps = useMemo(
		() => ({
			receiverId: receiverIds,
			userSessionId: user?._id,
		}),
		[user?._id, receiverId],
	);

	if (isLoading) {
		return <div>Loading....</div>;
	}

	if (!receiverIds) {
		return <div>No receiverId available</div>;
	}

	return (
		<div className='flex flex-col h-[100%] rounded-2xl border-1 shadow-lg'>
			<ReceiverProvider receiverId={receiverIds}>
				<ReceiverUser />
				<Messages {...memoizedIdProps} />
				<SendMessageInput {...memoizedIdProps} />
			</ReceiverProvider>
		</div>
	);
});

export default MessagesContent;
