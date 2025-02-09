'use client';
import { User, Accordion, AccordionItem } from '@nextui-org/react';

export default function RightSideBar() {
	const defaultContent =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
	return (
		<aside className='flex flex-col gap-4 h-full '>
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
}
