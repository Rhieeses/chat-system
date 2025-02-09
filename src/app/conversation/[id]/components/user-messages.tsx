'use client';
import { Avatar, ScrollShadow, Badge } from '@nextui-org/react';
import React, { useEffect, useRef } from 'react';
import { useReceiver } from '@/context/receiver-context';
import getMessages from '@/app/actions/get-messages';
import { Loading } from './loading';
import { TimeFormatter } from '@/app/utils/formatter';

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

export const UserMessages = React.memo(({ userSessionId }: { userSessionId: string }) => {
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
			className='convo-contents flex flex-col gap-1 w-full h-full overflow-y-scroll p-3 border-r-[1px] border-color'>
			<div className='flex justify-center w-full h-full p-5'>
				<div className='flex flex-col items-center'>
					<Avatar
						size='lg'
						color='success'
						radius='full'
						src='https://avatar.iran.liara.run/public/4'
					/>

					<h1 className=' font-semibold text-2xl capitalize'>{receiverInfo?.fullName}</h1>
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

											<div className='group flex flex-col gap-2 justify-start'>
												{messages
													.filter(
														(msg: messagesSchema, i: number) =>
															msg.senderId === messageItem.senderId &&
															i >= index,
													)
													.map((msg: messagesSchema) => (
														<React.Fragment key={msg._id}>
															<p className='text-md border-[1px] border-color p-4 w-fit rounded-2xl'>
																{msg.message}
															</p>

															<span className='text-gray-400 text-sm group-active:block hidden'>
																{TimeFormatter(msg.createdAt)}
															</span>
														</React.Fragment>
													))}
											</div>
										</div>
									) : null
								) : (
									<div className='flex items-end justify-end w-full h-fit'>
										<div className='group flex flex-col justify-end'>
											<p className='text-md border-[1px] border-blue-400/20 p-4 rounded-2xl bg-blue-400/10'>
												{messageItem.message}
											</p>
											<span className='text-gray-400 text-sm group-active:block hidden'>
												{TimeFormatter(messageItem.createdAt)}
											</span>
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
