import React from 'react';
import Sidebar from './sidebar';
import Header from './header';
import RightSideBar from './right-sidebar';
import { UserProvider } from '@/context/user-context';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	return (
		<UserProvider>
			<div className='flex gap-5 bg-black h-screen w-screen p-7'>
				<Sidebar />
				<div className='flex flex-col w-full'>
					<Header />
					<div className='flex gap-5 h-[90%]'>
						{children}
						<RightSideBar />
					</div>
				</div>
			</div>
		</UserProvider>
	);
}

/**
 * <main className='flex h-screen overflow-hidden'>
				<Sidebar />
				<div className='flex flex-col w-full h-full'>
					<Header />
					<div className='p-5 h-full overflow-hidden'>{children}</div>
				</div>
			</main>
 */
