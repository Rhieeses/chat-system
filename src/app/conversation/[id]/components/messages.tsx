'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { useUser } from '@/context/user-context';
import { ReceiverProvider, useReceiver } from '@/context/receiver-context';
import SendMessageInput from './send-message';
import { Loading } from './loading';
import { UserMessages } from './user-messages';
import { MessagesHeader } from './messages-header';

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
			<div className='flex h-full w-[75%]   rounded-xl p-5'>
				<Loading />
			</div>
		);
	}

	if (!receiverIds) {
		return (
			<div className='flex items-center justify-center  w-full h-full   rounded-xl p-5'>
				Start a conversation with a person.
			</div>
		);
	}

	return (
		<ReceiverProvider receiverId={receiverIds}>
			<div className='flex flex-col h-full w-[75%] rounded-xl'>
				<MessagesHeader />
				<UserMessages {...memoizedIdProps} />
				<div className='w-full'>
					<SendMessageInput {...memoizedIdProps} />
				</div>
			</div>
		</ReceiverProvider>
	);
});

export default MessagesContent;
