export const TaskCardSkeleton = () => {
  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-gray-200 animate-pulse'>
      <div className='p-6'>
        <div className='flex justify-between items-start'>
          <div className='space-y-2'>
            <div className='h-6 w-3/4 bg-gray-200 rounded'></div>
            <div className='h-4 w-20 bg-gray-200 rounded'></div>
          </div>
          <div className='h-4 w-12 bg-gray-200 rounded'></div>
        </div>

        <div className='mt-3 space-y-2'>
          <div className='h-4 bg-gray-200 rounded'></div>
          <div className='h-4 bg-gray-200 rounded w-5/6'></div>
          <div className='h-4 bg-gray-200 rounded w-2/3'></div>
        </div>

        {/* Photo Gallery Skeleton */}
        <div className='mt-4'>
          <div className='h-40 bg-gray-200 rounded-lg'></div>
          <div className='flex gap-2 mt-2'>
            {[...Array(3)].map((_, i) => (
              <div key={i} className='h-12 w-12 bg-gray-200 rounded'></div>
            ))}
          </div>
        </div>

        {/* Comments Skeleton */}
        <div className='mt-4 space-y-3'>
          {[...Array(2)].map((_, i) => (
            <div key={i} className='flex gap-3'>
              <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
              <div className='flex-1 space-y-2'>
                <div className='h-3 w-20 bg-gray-200 rounded'></div>
                <div className='h-3 w-full bg-gray-200 rounded'></div>
                <div className='h-3 w-3/4 bg-gray-200 rounded'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
