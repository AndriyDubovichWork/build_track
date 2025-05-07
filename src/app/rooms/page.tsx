'use client';
import { useEffect, useState } from 'react';
import { NavButtons } from '../Components/Layout/NavButtons';
import roomsByCompanyId from '../APIRequests/roomsByCompanyId';
import { useSearchParams } from 'next/navigation';
import { Room } from '../types';
import { RoomCard } from '../Components/Layout/RoomCard';
import RoomCardSkeleton from '../Components/SkeletonLoaders/RoomCardSkeleton';

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const companyId = searchParams.get('companyId') || '1';

  useEffect(() => {
    setIsLoading(true);
    roomsByCompanyId(parseInt(companyId))
      .then(({ data }) => {
        setRooms(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [companyId]);

  return (
    <>
      <NavButtons activeTab='rooms' />
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>Rooms List:</h1>

      {isLoading ? (
        <div className='space-y-4'>
          {[...Array(3)].map((_, index) => (
            <RoomCardSkeleton key={index} />
          ))}
        </div>
      ) : rooms.length === 0 ? (
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>
          No rooms found
        </h1>
      ) : (
        <div className='space-y-4'>
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} companyId={companyId} />
          ))}
        </div>
      )}
    </>
  );
}
