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
									className='flex grow w-full'
									radius='md'
									size='lg'
									classNames={{
										inputWrapper: 'bg-gray-300',
										input: 'focus:bg-black ',
									}}
									startContent={
										<Dropdown
											placement='top'
											showArrow
											classNames={{
												base: 'before:bg-default-200', // change arrow background
											}}>
											<DropdownTrigger>
												<i
													className={`bx bx-happy-alt bx-sm  cursor-pointer transition-transform duration-500 ease-in-out pr-2`}></i>
											</DropdownTrigger>
											<DropdownMenu
												aria-label='Dynamic Actions'
												variant='faded'
												className='grid grid-cols-4 gap-2 p-2 bg-white rounded shadow'>
												{items.map((item) => (
													<DropdownItem
														key={item.key}
														className='text-center p-2 bg-gray-100 hover:bg-gray-200 rounded'>
														{item.label}
													</DropdownItem>
												))}
											</DropdownMenu>
										</Dropdown>
									}
									placeholder='Your message'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className={`flex items-center gap-3`}>
					{message ? (
						<Button
							type='submit'
							variant='bordered'
							className='font-semibold text-blue-500 border-none text-md'>
							Send
						</Button>
					) : (
						<div className='flex items-center gap-3 transition-[width] duration-200 ease-in-out'>
							<i className='bx bx-paperclip bx-sm -rotate-[35deg]'></i>

							<i className='bx bx-image-alt bx-sm cursor-pointer'></i>

							<i className='bx bx-like bx-sm cursor-pointer'></i>
						</div>
					)}
				</div>
			</form>
		</Form>
	);
}
