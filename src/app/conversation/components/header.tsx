'use client';
import React, { useState } from 'react';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
	Badge,
	User,
} from '@nextui-org/react';
import AddUserModal from './add-modal';
import { useUser } from '@/context/user-context';

const Header = React.memo(() => {
	const { user } = useUser();

	const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);

	const handleOpenAdd = (value: boolean) => {
		setIsAddUserOpen(value);
	};

	return (
		<header className='p-5 pb-0 w-full h-fit'>
			<AddUserModal
				isAddUserOpen={isAddUserOpen}
				handleOpenAdd={handleOpenAdd}
			/>
			<nav className='flex justify-end items-center gap-5 p-2'>
				<i
					onClick={() => handleOpenAdd(true)}
					className='bx bx-user-plus bx-sm border-1 rounded-full p-2 bg-green-500 text-green-200 cursor-pointer hover:scale-105 duration-300'></i>

				<i className='bx bx-calendar bx-sm'></i>
				<i className='bx bx-bell bx-sm'></i>
				<i className='bx bx-message-square-dots bx-sm'></i>

				<Dropdown placement='bottom-end'>
					<Badge
						isOneChar
						color='success'
						content={<i className='fa-solid fa-circle text-green-500'></i>}
						placement='bottom-right'>
						<DropdownTrigger className='cursor-pointer'>
							<Avatar
								size='md'
								color='success'
								radius='full'
								src={
									user?.profilePicture || 'https://avatar.iran.liara.run/public/4'
								}
							/>
						</DropdownTrigger>
					</Badge>
					<DropdownMenu
						aria-label='Profile Actions'
						variant='flat'>
						<DropdownItem
							key='profile'
							className='h-9 gap-2'>
							<p className='font-semibold'>{user?.email}</p>
						</DropdownItem>
						<DropdownItem
							key='settings'
							startContent={<i className='bx bx-cog bx-sm' />}>
							<span>My Settings</span>
						</DropdownItem>
						<DropdownItem
							key='help_and_feedback'
							startContent={<i className='bx bx-help-circle bx-sm' />}>
							<span>Help & Feedback</span>
						</DropdownItem>
						<DropdownItem
							key='logout'
							color='danger'
							className='border-t-1 rounded-t-none'
							startContent={<i className='bx bx-log-out bx-sm' />}>
							<span>Log Out</span>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</nav>
		</header>
	);
});

export default Header;
