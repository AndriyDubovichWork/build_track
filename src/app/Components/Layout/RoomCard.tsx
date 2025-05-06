import { Room } from '@/app/types';

interface RoomCardProps {
  room: Room;
}

export const RoomCard = ({ room }: RoomCardProps) => {
  return (
    <a href={`/tasks?roomId=${room.id}`}>
      <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200'>
        <div className='flex justify-between items-center'>
          <h2 className='text-xl font-bold text-orange-500'>{room.name}</h2>
          <span className='text-sm text-gray-500'>ID: {room.id}</span>
        </div>

        <div className='mt-4 space-y-2'>
          <p className='text-gray-600'>
            <span className='font-medium'>Location:</span> {room.location}
          </p>
          <p className='text-gray-600'>
            <span className='font-medium'>Type:</span> {room.type_of_build}
          </p>
          <p className='text-gray-600'>
            <span className='font-medium'>Description:</span> {room.description}
          </p>
          <p className='text-gray-600'>
            <span className='font-medium'>Company ID:</span> {room.company_id}
          </p>
          <p className='text-gray-600'>
            <span className='font-medium'>User ID:</span> {room.user_id}
          </p>
        </div>

        <div className='mt-4 flex justify-between text-sm text-gray-500'>
          <p>Start: {new Date(room.start_date).toLocaleDateString()}</p>
          <p className='text-red-500'>
            Deadline: {new Date(room.deadline_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </a>
  );
};
