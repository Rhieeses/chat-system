'use client';
import {
	Badge,
	ScrollShadow,
	Input,
	User,
	Accordion,
	AccordionItem,
	Avatar,
} from '@nextui-org/react';

//sidebar
const ConvoCard = () => {
	return (
		<div className='flex items-center gap-4 w-full h-fit p-5   rounded-2xl hover:bg-opacity-30 duration-200 cursor-pointer'>
			<Badge
				size='sm'
				isOneChar
				color='success'
				placement='bottom-right'>
				<Avatar
					size='lg'
					color='success'
					radius='full'
					src='https://avatar.iran.liara.run/public/4'
				/>
			</Badge>
			<div className='w-full'>
				<h2 className='text-lg font-[400] tracking-wide '>Richard Wilson</h2>
				<p className='text-sm text-gray-300 truncate max-w-[80%]'>
					I will add you to our team, welcome
				</p>
			</div>
		</div>
	);
};

const SideBar = () => {
	return (
		<aside className='flex flex-col gap-5 w-[20%] h-full'>
			<div className='flex items-center '>
				<h2 className='font-semibold text-2xl text-center '>Messages</h2>
			</div>
			<Input
				classNames={{
					inputWrapper:
						'w-full h-fit p-5 rounded-full   group-hover:bg-opacity-20 focus:bg-opacity-0',
				}}
				startContent={<i className='fa-solid fa-magnifying-glass fa-lg  mr-3'></i>}
				placeholder='Search'
			/>
			<ScrollShadow
				hideScrollBar
				size={10}
				className='flex flex-col h-full gap-3 p-1 overflow-y-scroll'>
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
				<ConvoCard />
			</ScrollShadow>
		</aside>
	);
};

//sidebar

/**
 * 
 * 	<>
			<div className='receiver flex items-end gap-4 w-full h-fit p-3 rounded-2xl cursor-pointer'>
				<Badge
					size='sm'
					isOneChar
					color='success'
					placement='bottom-right'>
					<Avatar
						size='lg'
						color='success'
						radius='full'
						src='https://avatar.iran.liara.run/public/4'
					/>
				</Badge>
				<div className='space-y-2'>
					<div className='flex flex-col gap-2'>
						<p className='text-md  max-w-[40%] bg-gray-500 p-3 rounded-2xl rounded-bl-none'>
							I will add you to our team, welcome I will add you to our team, welcome
							I will add you to our team, welcome I will add you to our team, welcome
							I will add you to our team, welcome
						</p>
						<p className='text-md  max-w-[40%] bg-gray-500 p-3 rounded-2xl rounded-bl-none'>
							I will add you to our team, welcome I will add you to our team, welcome
							I will add you to our team, welcome I will add you to our team, welcome
							I will add you to our team, welcome
						</p>
					</div>
				</div>
			</div>

			<div className='receiver flex justify-end gap-4 w-full h-fit p-3 rounded-2xl cursor-pointer'>
				<div className='flex flex-col justify-end items-end gap-2'>
					<p className='text-md  max-w-[40%] bg-gray-500 p-3 rounded-2xl rounded-br-none'>
						I will add you to our team, welcome I will add you to our team, welcome I
						will add you to our team, welcome I will add you to our team, welcome I will
						add you to our team, welcome
					</p>
					<p className='text-md  max-w-[40%] bg-gray-500 p-3 rounded-2xl rounded-br-none'>
						I will add you to our team, welcome I will add you to our team, welcome I
						will add you to our team, welcome I will add you to our team, welcome I will
						add you to our team, welcome
					</p>
				</div>
			</div>
		</>
 */
const MessageCard = () => {
	return (
		<>
			<div className='h-full flex items-end justify-end gap-5'>
				<Badge
					size='sm'
					isOneChar
					color='success'
					placement='bottom-right'>
					<Avatar
						size='lg'
						color='success'
						radius='full'
						src='https://avatar.iran.liara.run/public/4'
					/>
				</Badge>
				<div className='space-y-2'>
					<div className='flex flex-col gap-2'>
						<p className='text-md  max-w-[40%] bg-gray-500 p-3 rounded-2xl rounded-bl-none'>
							I will add you to our team, welcome I will add you to our team, welcome
							I will add you to our team, welcome I will add you to our team, welcome
							I will add you to our team, welcome
						</p>
						<p className='text-md  max-w-[40%] bg-gray-500 p-3 rounded-2xl rounded-bl-none'>
							I will add you to our team, welcome I will add you to our team, welcome
							I will add you to our team, welcome I will add you to our team, welcome
							I will add you to our team, welcome
						</p>
					</div>
				</div>
			</div>

			<div className='h-full flex items-end justify-end gap-5 w-full '>
				<p className='text-md  max-w-[40%] bg-gray-500 p-3 rounded-2xl rounded-bl-none'>
					I will add you to our team, welcome I will add you to our team, welcome I will
					add you to our team, welcome I will add you to our team, welcome I will add you
					to our team, welcome
				</p>
			</div>
		</>
	);
};

const MessageContent = () => {
	return (
		<div className='flex flex-col w-[75%]  bg-opacity-20 rounded-xl p-5'>
			<div className='flex items-center justify-between  shadow-md pb-5'>
				<div className='flex items-center h-[10%] gap-2 '>
					<Badge
						size='sm'
						isOneChar
						color='success'
						placement='bottom-right'>
						<Avatar
							size='lg'
							color='success'
							radius='full'
							src='https://avatar.iran.liara.run/public/4'
						/>
					</Badge>
					<h1 className='text-xl text-start'>Richard Wilson</h1>
				</div>

				<div className='grid grid-cols-3 gap-2'>
					<div>
						<i className='fa-solid fa-phone-volume rotate-[320deg] bg-blue-500 rounded-full p-4 text-xl hover:bg-blue-600 cursor-pointer duration-200' />
					</div>
					<div>
						<i className='fa-solid fa-video bg-green-500 rounded-full p-4 text-xl hover:bg-green-600 cursor-pointer duration-200' />
					</div>

					<div>
						<i className='fa-solid fa-ellipsis   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
					</div>
				</div>
			</div>

			<ScrollShadow
				hideScrollBar
				size={5}
				className='convo-contents flex flex-col gap-5 w-full h-full overflow-y-scroll p-3'>
				<MessageCard />
			</ScrollShadow>

			<div className='w-full'>
				<Input
					classNames={{
						inputWrapper:
							'w-full h-fit p-5 rounded-3xl   group-hover:bg-opacity-20 active:!bg-black',
					}}
					startContent={<i className='fa-solid fa-paperclip fa-lg  mr-3'></i>}
					endContent={<i className='fa-regular fa-paper-plane fa-lg '></i>}
					placeholder='Write a message...'
				/>
			</div>
		</div>
	);
};

//info sidebar
const RightSideBar = () => {
	const defaultContent =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
	return (
		<aside className='flex flex-col gap-4 w-[25%] h-full '>
			<div className='grid grid-cols-4 gap-2 rounded-2xl   p-4'>
				<div>
					<i className='fa-solid fa-phone-volume rotate-[320deg]   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
				</div>
				<div>
					<i className='fa-solid fa-magnifying-glass   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
				</div>
				<div>
					<i className='fa-solid fa-thumbtack rotate-[40deg]   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
				</div>
				<div>
					<i className='fa-solid fa-user-group   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
				</div>
			</div>

			<div className='rounded-2xl   p-4'>
				<h2 className='font-semibold text-xl mb-5'>Participants</h2>
				<ul className='space-y-2'>
					<li>
						<User
							avatarProps={{
								size: 'lg',
								src: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
							}}
							classNames={{
								name: 'text-md',
							}}
							name='Jane Doe'
						/>
					</li>
					<li>
						<User
							avatarProps={{
								size: 'lg',
								src: 'https://i.pravatar.cc/150?u=a04238114e29026702d',
							}}
							classNames={{
								name: 'text-md',
							}}
							name='You'
						/>
					</li>
				</ul>
			</div>

			<div className='rounded-2xl   p-4'>
				<h2 className='font-semibold text-xl mb-5'>Files</h2>
				<Accordion selectionMode='multiple'>
					<AccordionItem
						key='1'
						aria-label='photos'
						startContent={<i className='fa-solid fa-image fa-xl'></i>}
						title='115 photos'
						classNames={{
							title: ' text-gray-400 text-md',
							indicator: 'rotate-[180deg]',
						}}>
						{defaultContent}
					</AccordionItem>
					<AccordionItem
						key='2'
						aria-label='files'
						startContent={<i className='fa-solid fa-file fa-xl'></i>}
						title='208 files'
						classNames={{
							title: ' text-gray-400 text-md',
							indicator: 'rotate-[180deg]',
						}}>
						{defaultContent}
					</AccordionItem>
					<AccordionItem
						key='3'
						aria-label='link'
						startContent={<i className='fa-solid fa-link fa-xl'></i>}
						title='208 files'
						classNames={{
							title: ' text-gray-400 text-md',
							indicator: 'rotate-[180deg]',
						}}>
						{defaultContent}
					</AccordionItem>
				</Accordion>
			</div>
		</aside>
	);
};

const Header = () => {
	return (
		<header className='flex items-start justify-end w-full h-[9%] '>
			<div className='flex items-center w-[80%] justify-end gap-3'>
				<div>
					<i className='fa-solid fa-gear   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
				</div>
				<div>
					<i className='fa-solid fa-user-plus   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
				</div>
				<div>
					<Badge
						size='sm'
						isOneChar
						color='success'
						placement='bottom-right'>
						<Avatar
							size='lg'
							color='success'
							radius='full'
							src='https://avatar.iran.liara.run/public/4'
						/>
					</Badge>
				</div>
			</div>
		</header>
	);
};

export default function Test() {
	return (
		<div className='flex gap-5 bg-black h-screen w-screen p-7'>
			<div className='flex  items-end gap-3 h-full justify-start'>
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

				<div className='flex flex-col gap-2 justify-end'>
					<p
						className='text-md  bg-gray-500 p-4 rounded-2xl rounded-bl-none
													'>
						I will add you to our team, welcome I will add you to our team, welcome I
						will add you to our team, welcome I will add you to our team, welcome I will
						add you to our team, welcome
					</p>
					<p
						className='text-md  bg-gray-500 p-4 rounded-2xl rounded-bl-none
													'>
						I will add you to our team, welcome I will add you to our team, welcome I
						will add you to our team, welcome I will add you to our team, welcome I will
						add you to our team, welcome
					</p>
					<p
						className='text-md  bg-gray-500 p-4 rounded-2xl rounded-bl-none
													'>
						I will add you to our team, welcome I will add you to our team, welcome I
						will add you to our team, welcome I will add you to our team, welcome I will
						add you to our team, welcome
					</p>
					<p
						className='text-md  bg-gray-500 p-4 rounded-2xl rounded-bl-none
													'>
						I will add you to our team, welcome I will add you to our team, welcome I
						will add you to our team, welcome I will add you to our team, welcome I will
						add you to our team, welcome
					</p>
				</div>
			</div>
		</div>
	);
}

/**
 * <div className='flex items-center h-full'>
	<h1 className='text-3xl'>Richard Wilson</h1>
</div>;

 */
