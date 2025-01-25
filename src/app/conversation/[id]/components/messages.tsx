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
	Badge,
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

const ReceiverUser = () => {
	const { receiverInfo } = useReceiver();

	return (
		<>
			{receiverInfo ? (
				<div className='flex items-center justify-between !text-white shadow-md pb-5'>
					<div className='flex items-center h-[10%] gap-2 '>
						<Badge
							size='sm'
							isOneChar
							color={
								receiverInfo?.activeStatus === 'online'
									? 'success'
									: receiverInfo?.activeStatus === 'offline'
									? 'danger'
									: receiverInfo?.activeStatus === 'away'
									? 'warning'
									: 'default'
							}
							placement='bottom-right'>
							<Avatar
								size='lg'
								color={
									receiverInfo?.activeStatus === 'online'
										? 'success'
										: receiverInfo?.activeStatus === 'offline'
										? 'danger'
										: receiverInfo?.activeStatus === 'away'
										? 'warning'
										: 'default'
								}
								radius='full'
								src='https://avatar.iran.liara.run/public/4'
							/>
						</Badge>
						<h1 className='text-xl text-start'>{receiverInfo?.fullName}</h1>
					</div>

					<div className='grid grid-cols-3 gap-2 '>
						<div>
							<i className='fa-solid fa-phone-volume rotate-[320deg] bg-blue-500 rounded-full p-4 text-xl hover:bg-blue-600 cursor-pointer duration-200' />
						</div>
						<div>
							<i className='fa-solid fa-video bg-green-500 rounded-full p-4 text-xl hover:bg-green-600 cursor-pointer duration-200' />
						</div>

						<div>
							<i className='fa-solid fa-ellipsis bg-white bg-opacity-10 rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
						</div>
					</div>
				</div>
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
		</>
	);
};

const Loading = () => {
	return (
		<div className='h-full w-full flex flex-col items-end justify-end p-5'>
			{Array.from({ length: 5 }).map((_, index) => (
				<React.Fragment key={index}>
					<div className='w-full flex items-end justify-end gap-3'>
						<div className='w-1/3 flex items-center gap-2'>
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
						<div className='w-1/3 flex items-center gap-2'>
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
};
const Messages = React.memo(({ userSessionId }: { userSessionId: string }) => {
	const { receiverInfo, conversationId } = useReceiver();

	const { messages, isLoading } = getMessages({ conversationId });

	const messageScrollRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (messageScrollRef.current) {
			messageScrollRef.current.scrollTop = messageScrollRef.current.scrollHeight;
		}
	}, [messages]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<ScrollShadow
			ref={messageScrollRef}
			hideScrollBar
			size={5}
			className='convo-contents flex flex-col gap-5 w-full h-full overflow-y-scroll p-3'>
			<div className='flex justify-center w-full h-full p-5'>
				<div className='flex flex-col items-center'>
					<Avatar
						size='lg'
						color='success'
						radius='full'
						src='https://avatar.iran.liara.run/public/4'
					/>

					<h1 className='text-white font-semibold text-2xl capitalize'>
						{receiverInfo?.fullName}
					</h1>
				</div>
			</div>
			{messages?.length > 0 && !isLoading
				? messages.map((messageItem: any, index: number) => {
						const isCurrentUser = messageItem.senderId === userSessionId;
						const isPrevMessageFromSameSender =
							index > 0 && messages[index - 1].senderId === messageItem.senderId;

						return (
							<React.Fragment key={messageItem._id}>
								{!isCurrentUser ? (
									!isPrevMessageFromSameSender ? (
										<div className='flex items-end gap-3 justify-start'>
											<Badge
												size='sm'
												isOneChar
												color='success'
												placement='bottom-right'>
												<Avatar
													size='sm'
													color='success'
													radius='full'
													src='https://avatar.iran.liara.run/public/4'
												/>
											</Badge>

											<div className='flex flex-col gap-2 justify-start'>
												{messages
													.filter(
														(msg: messagesSchema, i: number) =>
															msg.senderId === messageItem.senderId &&
															i >= index,
													)
													.map((msg: messagesSchema) => (
														<p
															key={msg._id}
															className='text-md text-white bg-gray-500 p-4 w-fit rounded-2xl rounded-bl-none'>
															{msg.message}
														</p>
													))}
											</div>
										</div>
									) : null
								) : (
									<div className='flex items-end gap-3 justify-end w-full h-fit'>
										<div className='flex flex-col gap-2 justify-end'>
											<p className='text-md text-white bg-gray-500 p-4 rounded-2xl rounded-br-none'>
												{messageItem.message}
											</p>
										</div>
									</div>
								)}
							</React.Fragment>
						);
				  })
				: null}
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
			setLoading(false);
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
		return (
			<div className='flex h-full w-[75%] bg-white bg-opacity-10 rounded-xl p-5'>
				<Loading />
			</div>
		);
	}

	if (!receiverIds) {
		return (
			<div className='flex items-center justify-center text-white w-full h-full bg-white bg-opacity-10 rounded-xl p-5'>
				Start a conversation with a person.
			</div>
		);
	}

	return (
		<ReceiverProvider receiverId={receiverIds}>
			<div className='flex flex-col h-full w-[75%] bg-white bg-opacity-10 rounded-xl p-5'>
				<ReceiverUser />
				<Messages {...memoizedIdProps} />
				<div className='w-full'>
					<SendMessageInput {...memoizedIdProps} />
				</div>
			</div>
		</ReceiverProvider>
	);
});

export default MessagesContent;
