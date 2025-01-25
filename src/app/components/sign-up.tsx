'use client';
import axios from 'axios';
import { Input, Button, Checkbox } from '@nextui-org/react';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import SuccessModal from './success-modal';

type loginChangeProps = {
	isLoginChange: (isLogin: boolean) => void;
};

const signUpSchema = z
	.object({
		fullName: z
			.string()
			.min(4, { message: 'Full name is too short' })
			.max(50, { message: 'Full name is too long' }),

		userName: z.string().min(4),
		email: z.string().email({ message: 'Invalid email address' }),

		password: z
			.string()
			.min(6, { message: 'Password is too short' })
			.max(25, { message: 'Password is too long' }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export default function SignUp({ isLoginChange }: loginChangeProps) {
	const router = useRouter();
	const [isVisible, setIsVisible] = useState<boolean>(false);
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<{
		errorEmail: string;
		errorUsername: string;
		formError: string;
	}>({
		errorEmail: '',
		errorUsername: '',
		formError: '',
	});
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [isAgree, setIsAgree] = useState<boolean>(false);

	const handleLoginChange = () => {
		const loginChange = !isLogin;
		setIsLogin(loginChange);
		isLoginChange(isLogin);
	};

	const signUpForm = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			userName: '',
			fullName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	const onSubmitForm = async (values: z.infer<typeof signUpSchema>): Promise<void> => {
		setLoading(true);

		try {
			await axios.post('/api/auth/signup', values);
			setIsOpen(true);
			setMessage('Sign up successful!');
		} catch (err: any) {
			if (axios.isAxiosError(err)) {
				if (err.response?.status === 400) {
					setError({
						errorEmail: err.response?.data?.emailError || '', // Email error
						errorUsername: err.response?.data?.userNameError || '', // Username error (if present)
						formError: '',
					});
				} else if (err.response?.status === 401) {
					setError({
						errorEmail: err.response?.data?.emailError || '', // Email error
						errorUsername: err.response?.data?.userNameError || '', // Username error (if present)
						formError: '',
					});
				} else {
					setIsOpen(true);
					setMessage('Error during signup!');
				}
			} else {
				setIsOpen(true);

				setError({
					errorEmail: err.response?.data?.emailError || '', // Email error
					errorUsername: err.response?.data?.userNameError || '', // Username error (if present)
					formError: err?.data?.message || '',
				});
				setMessage('An unexpected error occurred. Please try again');
			}
		} finally {
			setLoading(false);
			setIsOpen(false);
			router.push('/');
		}
	};
	return (
		<div className='flex flex-col gap-7 items-center justify-center lg:p-5 pt-0 p-5 overflow-hidden'>
			<div className='flex flex-col gap-7 items-start w-full lg:w-[70%] w-full'>
				<div className='flex items-center gap-4'>
					<i className='bx bxs-magic-wand bx-md border-1 p-2 rounded-xl' />
					<div>
						<strong className='text-2xl'>Create an account</strong>
						<div className='flex gap-2'>
							<p className='text-gray-500 tracking-wide'> Already have an account?</p>
							<strong
								className='text-black cursor-pointer underline'
								onClick={handleLoginChange}>
								Login
							</strong>
						</div>
					</div>
				</div>
			</div>
			<SuccessModal
				openModal={isOpen}
				message={message}
			/>

			<Form {...signUpForm}>
				<form
					onSubmit={signUpForm.handleSubmit(onSubmitForm)}
					className='lg:w-[70%] w-full'>
					<section className='step-1 space-y-[2.7rem]'>
						<FormField
							control={signUpForm.control}
							name='fullName'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											size='lg'
											radius='md'
											label='Full name'
											isRequired
											labelPlacement='outside'
											variant='bordered'
											placeholder='Full name'
											classNames={{
												inputWrapper:
													'border-gray-400 bg-white border-1 p-8 text-black',
												label: '!text-black pb-3',
											}}
											startContent={
												<i className='bx bx-user bx-sm text-gray-500' />
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className='grid grid-cols-2 gap-5'>
							<FormField
								control={signUpForm.control}
								name='userName'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												size='lg'
												radius='md'
												label='Username'
												isRequired
												labelPlacement='outside'
												variant='bordered'
												placeholder='Username'
												classNames={{
													inputWrapper:
														'border-gray-400 bg-white border-1 p-8 text-black',
													label: '!text-black pb-3',
												}}
												startContent={
													<i className='bx bx-user bx-sm text-gray-500' />
												}
												{...field}
											/>
										</FormControl>
										<p className='text-red-500'>{error.errorUsername}</p>

										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={signUpForm.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												size='lg'
												radius='md'
												label='Email'
												isRequired
												labelPlacement='outside'
												variant='bordered'
												placeholder='Email'
												classNames={{
													inputWrapper:
														'border-gray-400 bg-white border-1 p-8 text-black',
													label: '!text-black pb-3',
												}}
												startContent={
													<i className='bx bx-envelope bx-sm text-gray-500' />
												}
												{...field}
											/>
										</FormControl>
										<p className='text-red-500'>{error.errorEmail}</p>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={signUpForm.control}
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
											label='Password'
											labelPlacement='outside'
											isRequired
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
												inputWrapper:
													'border-gray-400 bg-white border-1 p-8 text-black',
												label: '!text-black pb-3',
											}}
											startContent={
												<i className='bx bx-lock-alt bx-sm text-gray-500' />
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={signUpForm.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type={`${isVisible ? 'text' : 'password'}`}
											size='lg'
											radius='lg'
											variant='bordered'
											placeholder='Re-enter password'
											label='Confirm password'
											labelPlacement='outside'
											classNames={{
												inputWrapper:
													'border-gray-400 bg-white border-1 p-8 text-black',
												label: '!text-black pb-3',
											}}
											startContent={
												<i className='bx bx-lock-alt bx-sm text-gray-500' />
											}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{error.formError}
						<div className='w-full space-y-2'>
							<Checkbox
								className='w-full'
								isSelected={isAgree}
								onChange={(e) => setIsAgree(e.target.checked)}
								classNames={{ label: 'text-black text-sm' }}>
								<span className='flex gap-1'>
									I agree with <p className='underline'>terms and conditions</p>
								</span>
							</Checkbox>

							<div className='flex gap-2'>
								<Button
									onClick={handleLoginChange}
									radius='full'
									variant='bordered'
									isDisabled={loading}
									size='lg'
									className='w-full font-bold p-9'>
									Cancel
								</Button>
								<Button
									type='submit'
									radius='full'
									isLoading={loading}
									isDisabled={loading || !isAgree}
									size='lg'
									endContent={
										<i className='bx bx-right-arrow-alt bx-sm mt-2'></i>
									}
									className='bg-blue-700 text-white w-full font-bold p-9'>
									Sign up
								</Button>
							</div>
						</div>
					</section>
					<section className='step-2 hidden'>
						<div className='flex items-center gap-5'>
							<i className='bx bx-envelope bx-md border-1 p-2 rounded-xl' />
							<div>
								<strong className='text-2xl'>Check your email</strong>
								<p className='text-gray-500 underline'>
									We sent a code to amelie@untitledui.com
								</p>
							</div>
						</div>
					</section>
				</form>
			</Form>
		</div>
	);
}
