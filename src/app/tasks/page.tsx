'use client';
import { useEffect, useState } from 'react';
import { NavButtons } from '../Components/Layout/NavButtons';
import { useSearchParams } from 'next/navigation';
import { Task } from '../types';
import { TaskCard } from '../Components/Layout/TaskCard';
import { TaskCardSkeleton } from '../Components/SkeletonLoaders/TaskCardSkeleton';
import tasksByRoomId from '../APIRequests/tasksByRoomId';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId') || '1';
  const companyId = searchParams.get('companyId') || '1';

  useEffect(() => {
    setIsLoading(true);
    tasksByRoomId(parseInt(roomId))
      .then(({ data }) => {
        setTasks(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [roomId]);

  return (
    <>
      <NavButtons activeTab='rooms' companyId={companyId} />
      <h1 className='text-3xl font-bold text-gray-800 mb-6'>Tasks List:</h1>

      {isLoading ? (
        <div className='space-y-4'>
          {[...Array(3)].map((_, index) => (
            <TaskCardSkeleton key={index} />
          ))}
        </div>
      ) : tasks.length === 0 ? (
        <h1 className='text-2xl font-bold text-gray-800 mb-6'>No tasks</h1>
      ) : (
        <div className='space-y-4'>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </>
  );
}
