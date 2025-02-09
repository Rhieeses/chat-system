'use client';
import { useState, useEffect } from 'react';
import { Input, Button, Checkbox } from '@nextui-org/react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

type loginChangeProps = {
	isLoginChange: (isLogin: boolean) => void;
};

const loginSchema = z.object({
	email: z.string().email().min(5).max(50),
	password: z.string().min(5).max(50),
});
export default function Login({ isLoginChange }: loginChangeProps) {
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [error, setError] = useState<string>('');
	const [successful, setSuccessful] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isValid, setIsValid] = useState<boolean>(true);
	const [token, setToken] = useState<string | null>(null);

	const router = useRouter();

	const toggleLogin = () => {
		const loginChange = !isLogin;
		setIsLogin(loginChange);
		isLoginChange(loginChange);
	};

	const loginForm = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const { watch } = loginForm;

	const email = watch('email');
	const password = watch('password');

	useEffect(() => {
		if (email && password.length >= 6) {
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	}, [email, password]);

	useEffect(() => {
		router.prefetch('/conversation');
		if (token) {
			router.replace('/conversation');
		}
	}, [router, token]);

	const onSubmitForm = async (values: z.infer<typeof loginSchema>): Promise<void> => {
		setIsLoading(true);
		try {
			const loginResponse = await axios.post('/api/auth/login', values);

			if (loginResponse.status === 200) {
				setSuccessful(true);
				const { token } = loginResponse.data;
				setToken(token);
			}
		} catch (err) {
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 400) {
					setError('Username or password incorect');
				}
			} else {
				setError('An unexpected error occurred. Please try again');
			}
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-col gap-5 items-center justify-center p-5'>
			<i className='bx bxl-messenger text-7xl text-blue-500' />

			<div className='text-center space-y-5'>
				<h1 className='text-4xl font-bold tracking-wide'>Welcome back!</h1>
				<p className='text-gray-500'>Please enter your details</p>
			</div>

			<Form {...loginForm}>
				<form
					onSubmit={loginForm.handleSubmit(onSubmitForm)}
					className='lg:w-[70%] w-full space-y-7'>
					<FormField
						control={loginForm.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										size='lg'
										radius='lg'
										variant='bordered'
										placeholder='Email'
										classNames={{
											inputWrapper: 'border-gray-400  border-1 p-8',
											label: 'text-3xl',
										}}
										startContent={
											<i className='bx bx-envelope bx-sm text-gray-500' />
										}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={loginForm.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										type={`${isVisible ? 'text' : 'password'}`}
										size='lg'
										radius='lg'
										variant='bordered'
										placeholder='Password'
										startContent={
											<i className='bx bx-lock-alt bx-sm text-gray-500' />
										}
										endContent={
											<i
												onClick={() => setIsVisible((prev) => !prev)}
												className={`${
													isVisible
														? 'bx bxs-bullseye'
														: 'bx bx-low-vision'
												} bx-sm text-gray-600 cursor-pointer`}></i>
										}
										classNames={{
											inputWrapper: 'border-gray-400  border-1 p-8',
											label: 'text-3xl',
										}}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className='h-[2rem]'>
						<p className='text-red-500 text-center w-full'>{error}</p>
					</div>
					<div className='flex justify-between items-center'>
						<Checkbox classNames={{ label: 'text-black text-sm' }}>
							Remember for 30 days
						</Checkbox>

						<p className='text-gray-500 text-sm'>Forgot password?</p>
					</div>
					<div className='space-y-3'>
						<Button
							type='submit'
							radius='full'
							isLoading={isLoading}
							isDisabled={!isValid || isLoading}
							size='lg'
							startContent={
								<i
									className={`bx bx-check bx-burst bx-md text-green-500 ${
										!successful ? '!hidden' : 'block'
									} `}
								/>
							}
							className='bg-black  w-full font-bold p-9'>
							Log in
						</Button>

						<Button
							radius='full'
							variant='bordered'
							size='lg'
							startContent={<i className='bx bxl-google bx-sm text-blue-500'></i>}
							className='w-full font-semibold p-9'>
							Log in with Google
						</Button>
					</div>
				</form>
			</Form>

			<p className='text-gray-500 tracking-wide'>
				Dont have an account?{' '}
				<strong
					className='text-black cursor-pointer'
					onClick={toggleLogin}>
					Sign Up
				</strong>
			</p>
		</div>
	);
}
