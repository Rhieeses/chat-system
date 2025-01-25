'use client';
import {
	Input,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useReceiver } from '@/context/receiver-context';
import { io, Socket } from 'socket.io-client';

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

const messageSchema = z.object({
	conversationId: z.string().optional(),
	senderId: z.string(),
	receiverId: z.string(),
	mediaUrl: z.string().optional(),
	message: z.string().min(1, { message: '' }).max(250),
	messageType: z.string().optional(),
});

interface SendMesssageProps {
	userSessionId: string;
	receiverId: any;
}

export default function SendMessageInput({ userSessionId, receiverId }: SendMesssageProps) {
	const { conversationId } = useReceiver();
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		const socketInstance: Socket = io('http://localhost:5000'); // Update the URL if needed
		setSocket(socketInstance);

		return () => {
			socketInstance.disconnect();
		};
	}, []);

	const messageForm = useForm<z.infer<typeof messageSchema>>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			conversationId: '',
			senderId: '',
			receiverId: '',
			message: '',
			messageType: '',
			mediaUrl: '',
		},
	});

	const { watch, handleSubmit } = messageForm;
	const message = watch('message');

	const onSubmitMessage = async (values: z.infer<typeof messageSchema>) => {
		messageForm.setValue('conversationId', conversationId || null);
		messageForm.setValue('senderId', userSessionId);
		messageForm.setValue('receiverId', receiverId);

		const formValue = messageForm.getValues();

		try {
			const response = await axios.post('/api/message/send-message', formValue);

			if (response.status === 200) {
				messageForm.reset();
				if (socket) {
					socket.emit('message', response.data.data);
				}
			}
		} catch (error: any) {
			console.error(error);
		}
	};

	return (
		<Form {...messageForm}>
			<form
				onSubmit={messageForm.handleSubmit(onSubmitMessage)}
				className='flex gap-3 w-full h-fit p-5'>
				<FormField
					name='message'
					render={({ field }) => (
						<FormItem className='w-full'>
							<FormControl>
								<Input
									{...field}
									classNames={{
										inputWrapper:
											'w-full h-fit p-5 rounded-3xl bg-white bg-opacity-10 group-hover:bg-opacity-20 ',
										input: 'text-lg',
									}}
									startContent={
										<i className='fa-solid fa-paperclip fa-lg text-white mr-3 '></i>
									}
									endContent={
										<>
											{message ? (
												<i className='fa-regular fa-paper-plane fa-lg fa-2xl text-blue-500'></i>
											) : (
												<i className='fa-solid fa-thumbs-up fa-2xl text-blue-500'></i>
											)}
										</>
									}
									placeholder='Write a message...'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
