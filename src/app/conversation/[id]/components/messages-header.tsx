import { Avatar, Skeleton, Badge } from '@nextui-org/react';
import { useReceiver } from '@/context/receiver-context';

export const MessagesHeader = () => {
	const { receiverInfo } = useReceiver();

	return (
		<>
			{receiverInfo ? (
				<div className='flex items-center justify-between border-b-[1px] border-color p-5'>
					<div className='flex items-center h-[10%] gap-2 '>
						<Badge
							size='sm'
							isOneChar
							color={
								receiverInfo?.activeStatus === 'online'
									? 'success'
									: receiverInfo?.activeStatus === 'offline'
									? 'danger'
									: receiverInfo?.activeStatus === 'away'
									? 'warning'
									: 'default'
							}
							placement='bottom-right'>
							<Avatar
								size='lg'
								color={
									receiverInfo?.activeStatus === 'online'
										? 'success'
										: receiverInfo?.activeStatus === 'offline'
										? 'danger'
										: receiverInfo?.activeStatus === 'away'
										? 'warning'
										: 'default'
								}
								radius='full'
								src='https://avatar.iran.liara.run/public/4'
							/>
						</Badge>
						<h1 className='capitalize text-xl text-start'>{receiverInfo?.fullName}</h1>
					</div>
				</div>
			) : (
				<div className='max-w-[300px] w-full flex items-center gap-3'>
					<div>
						<Skeleton className='flex rounded-full w-12 h-12' />
					</div>
					<div className='w-full flex flex-col gap-2'>
						<Skeleton className='h-3 w-3/5 rounded-lg' />
						<Skeleton className='h-3 w-4/5 rounded-lg' />
					</div>
				</div>
			)}
		</>
	);
};
