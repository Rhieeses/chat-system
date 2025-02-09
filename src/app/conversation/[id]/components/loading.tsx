import React from 'react';
import { Skeleton } from '@nextui-org/skeleton';

export const Loading = () => {
	return (
		<div className='h-full w-full flex flex-col items-end justify-end p-5'>
			{Array.from({ length: 5 }).map((_, index) => (
				<React.Fragment key={index}>
					<div className='w-full flex items-end justify-end gap-3'>
						<div className='w-1/3 flex items-center gap-2'>
							<div className='w-full flex flex-col items-end gap-2'>
								<Skeleton className='h-3 w-3/5 rounded-lg' />
								<Skeleton className='h-3 w-4/5 rounded-lg' />
							</div>
							<div>
								<Skeleton className='flex rounded-full w-12 h-12' />
							</div>
						</div>
					</div>

					<div className='w-full flex items-start justify-start gap-3'>
						<div className='w-1/3 flex items-center gap-2'>
							<div>
								<Skeleton className='flex rounded-full w-12 h-12' />
							</div>
							<div className='w-full flex flex-col gap-2'>
								<Skeleton className='h-3 w-3/5 rounded-lg' />
								<Skeleton className='h-3 w-4/5 rounded-lg' />
							</div>
						</div>
					</div>
				</React.Fragment>
			))}
		</div>
	);
};
