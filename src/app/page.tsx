'use client';
import { Input, Checkbox, Button, Image, Form } from '@nextui-org/react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Login from './components/login';
import SignUp from './components/sign-up';

export default function Home() {
	const [isLogin, setIsLogin] = useState<boolean>(true);

	const formsVariant = {
		hidden: { opacity: 0, x: 50 },
		visible: { opacity: 100, x: 0, transition: { duration: 0.2 } },
		exit: { opacity: 0, x: -50, transition: { duration: 0.2 } },
	};

	return (
		<div className='flex flex-col w-screen h-screen'>
			<header className='border-b-[1px] w-full p-3'>
				<div className='flex items-center gap-1 text-blue-500'>
					<i className='bx bxl-messenger bx-lg' />
					<h1 className='font-bold tracking-wide'>CHAT SYSTEM</h1>
				</div>
			</header>
			<main className='flex justify-center items-center w-full h-full'>
				<div className='rounded-2xl lg:w-1/2 w-full border-0 border-black  overflow-hidden'>
					<AnimatePresence mode='wait'>
						{isLogin ? (
							<motion.section
								key='login'
								variants={formsVariant}
								initial='hidden'
								animate='visible'
								exit='exit'
								className='log-in'>
								<Login isLoginChange={(isLogin: boolean) => setIsLogin(isLogin)} />
							</motion.section>
						) : (
							<motion.section
								key='signup'
								variants={formsVariant}
								initial='hidden'
								animate='visible'
								exit='exit'
								className='sign-up '>
								<SignUp isLoginChange={(isLogin: boolean) => setIsLogin(isLogin)} />
							</motion.section>
						)}
					</AnimatePresence>
				</div>
			</main>
		</div>
	);
}
