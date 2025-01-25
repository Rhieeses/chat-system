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

const Header = () => {
	const { user } = useUser();

	const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);

	const handleOpenAdd = (value: boolean) => {
		setIsAddUserOpen(value);
	};
	return (
		<header className='flex items-start justify-end w-full h-[9%] text-white'>
			<AddUserModal
				isAddUserOpen={isAddUserOpen}
				handleOpenAdd={handleOpenAdd}
			/>
			<div className='flex items-center w-[80%] justify-end gap-3'>
				<div>
					<i className='fa-solid fa-gear bg-white bg-opacity-10 rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
				</div>
				<div onClick={() => handleOpenAdd(true)}>
					<i className='fa-solid fa-user-plus bg-white bg-opacity-10 rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
				</div>
				<div>
					<Dropdown placement='bottom-end'>
						<Badge
							size='sm'
							isOneChar
							color='success'
							placement='bottom-right'>
							<Avatar
								size='lg'
								color='success'
								radius='full'
								src={
									user?.profilePicture || 'https://avatar.iran.liara.run/public/4'
								}
							/>
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
				</div>
			</div>
		</header>
	);
};
export default Header;
