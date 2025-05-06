const CompanyCardSkeleton = () => {
  return (
    <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200 animate-pulse'>
      <div className='flex justify-between items-center'>
        <div className='h-6 w-1/3 bg-gray-200 rounded'></div>
        <div className='h-4 w-10 bg-gray-200 rounded'></div>
      </div>

      <div className='mt-4 space-y-2'>
        <div className='h-4 w-full bg-gray-200 rounded'></div>
        <div className='h-4 w-3/4 bg-gray-200 rounded'></div>
      </div>
    </div>
  );
};
export default CompanyCardSkeleton;
