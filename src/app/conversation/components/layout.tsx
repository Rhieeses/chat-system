import Sidebar from './sidebar';
import Header from './header';
import React from 'react';
import { UserProvider } from '@/context/user-context';

interface LayoutProps {
	children: React.ReactNode;
}

const SidebarNew = () => {
	return <div></div>;
};
const Layout = React.memo(({ children }: LayoutProps) => {
	return (
		<UserProvider>
			<main className='flex h-screen overflow-hidden'>
				<Sidebar />
				<div className='flex flex-col w-full h-full'>
					<Header />
					<div className='p-5 h-full overflow-hidden'>{children}</div>
				</div>
			</main>
		</UserProvider>
	);
});

export default Layout;
