'use client';
import React, { useState } from 'react';
import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
	Badge,
} from '@nextui-org/react';
import AddUserModal from '../../conversation/components/add-modal';
import { useUser } from '@/context/user-context';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
const Header = () => {
	const { user } = useUser();
	const router = useRouter();

	const [isAddUserOpen, setIsAddUserOpen] = useState<boolean>(false);

	const handleOpenAdd = (value: boolean) => {
		setIsAddUserOpen(value);
	};

	const handleLogout = async () => {
		try {
			Cookies.remove('user');
			const response = await axios.post('/api/auth/logout');

			if (response.status === 200) {
				router.push('/');
			}
		} catch (error) {
			console.error('Error', error);
		}
	};
	return (
		<header className='flex items-start w-full border-b-[1px] border-color'>
			<AddUserModal
				isAddUserOpen={isAddUserOpen}
				handleOpenAdd={handleOpenAdd}
			/>
			<div className='flex items-center justify-end w-full gap-3 p-5 '>
				<div>
					<i className='fa-solid fa-gear   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
				</div>
				<div onClick={() => handleOpenAdd(true)}>
					<i className='fa-solid fa-user-plus   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
				</div>

				<Dropdown placement='bottom-end'>
					<DropdownTrigger>
						<button>
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
										user?.profilePicture ||
										'https://avatar.iran.liara.run/public/4'
									}
								/>
							</Badge>
						</button>
					</DropdownTrigger>

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
							onClick={handleLogout}
							key='logout'
							color='danger'
							className='border-t-1 rounded-t-none'
							startContent={<i className='bx bx-log-out bx-sm' />}>
							<span>Log Out</span>
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		</header>
	);
};
export default Header;
