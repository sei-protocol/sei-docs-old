export default function AppCardSkeleton() {
	return (
		<div className='animate-pulse border backdrop-blur-sm bg-neutral-50/80 dark:bg-neutral-900/80 border-neutral-200/50 dark:border-neutral-800/50 p-5 h-full flex flex-col'>
			<div className='flex flex-col gap-4'>
				<div className='w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded' />
				<div className='flex flex-col gap-2'>
					<div className='h-5 w-32 bg-neutral-200 dark:bg-neutral-800 rounded' />
					<div className='h-4 w-full bg-neutral-200/70 dark:bg-neutral-800/70 rounded' />
					<div className='h-4 w-2/3 bg-neutral-200/70 dark:bg-neutral-800/70 rounded' />
				</div>
				<div className='h-4 w-28 bg-neutral-200/50 dark:bg-neutral-800/50 rounded mt-auto pt-2' />
			</div>
		</div>
	);
}
