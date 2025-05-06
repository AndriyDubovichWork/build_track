const RoomCardSkeleton = () => {
  return (
    <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200 animate-pulse'>
      <div className='flex justify-between items-center'>
        <div className='h-6 w-1/3 bg-gray-200 rounded'></div>
        <div className='h-4 w-10 bg-gray-200 rounded'></div>
      </div>

      <div className='mt-4 space-y-3'>
        {[...Array(5)].map((_, index) => (
          <div key={index} className='flex space-x-2'>
            <div className='h-4 w-16 bg-gray-200 rounded'></div>
            <div className='h-4 flex-1 bg-gray-200 rounded'></div>
          </div>
        ))}
      </div>

      <div className='mt-4 flex justify-between'>
        <div className='h-4 w-20 bg-gray-200 rounded'></div>
        <div className='h-4 w-20 bg-gray-200 rounded'></div>
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
