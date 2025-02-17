'use client';
import { useEffect, useState } from 'react';
import { User, Accordion, AccordionItem } from '@nextui-org/react';
import getConvoList from '@/app/actions/get-convo-list';
import { useUser } from '@/context/user-context';

export default function RightSideBar() {
	const { receiverId } = useUser();
	const { convoList } = getConvoList();
	const [convoMembers, setUsers] = useState<any>([]);

	useEffect(() => {
		if (convoList && convoList.length > 0) {
			const filterParticipants = convoList.filter(
				(convo) => convo.participants && convo.participants[0].user._id === receiverId,
			);

			if (filterParticipants.length > 0 && filterParticipants[0].participants) {
				const convoMembers = filterParticipants[0].participants[0].user;
				setUsers(convoMembers);
			}
		}
	}, [receiverId]);

	return (
		<aside className='flex flex-col gap-4 h-full border-l-[1px] border-color'>
			{!receiverId ? null : (
				<>
					<div className='grid grid-cols-4 gap-2 rounded-2xl   p-4'>
						<div>
							<i className='fa-solid fa-phone-volume rotate-[320deg]   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
						</div>
						<div>
							<i className='fa-solid fa-video   rounded-full p-4 text-xl hover:bg-yellow-600 cursor-pointer duration-200' />
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
										src:
											convoMembers.profilePicture ||
											'https://i.pravatar.cc/150?u=a04258114e29026702d',
									}}
									classNames={{
										name: 'text-md capitalize',
									}}
									name={convoMembers.fullName}
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
								title='0 photos'
								classNames={{
									title: ' text-gray-400 text-md',
									indicator: 'rotate-[180deg]',
								}}>
								No photos
							</AccordionItem>
							<AccordionItem
								key='2'
								aria-label='files'
								startContent={<i className='fa-solid fa-file fa-xl'></i>}
								title='0 files'
								classNames={{
									title: ' text-gray-400 text-md',
									indicator: 'rotate-[180deg]',
								}}>
								No Files
							</AccordionItem>
							<AccordionItem
								key='3'
								aria-label='link'
								startContent={<i className='fa-solid fa-link fa-xl'></i>}
								title='0 files'
								classNames={{
									title: ' text-gray-400 text-md',
									indicator: 'rotate-[180deg]',
								}}>
								No Links
							</AccordionItem>
						</Accordion>
					</div>
				</>
			)}
		</aside>
	);
}
