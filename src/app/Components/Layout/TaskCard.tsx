// components/Task/TaskCard.tsx
'use client';

import { TaskStatus } from './TaskStatus';
import { PhotoGallery } from './PhotoGallery';
import { CommentList } from './CommentList';
import { Task } from '@/app/types';
import { useEffect, useState } from 'react';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [formattedStartDate, setFormattedStartDate] = useState('');
  const [formattedDeadline, setFormattedDeadline] = useState('');

  useEffect(() => {
    setIsMounted(true);
    // Format dates after component mounts
    if (isMounted) {
      setFormattedStartDate(formatDate(task.start_date));
      setFormattedDeadline(formatDate(task.deadline_date));
    }
  }, [isMounted, task.start_date, task.deadline_date]);

  // Convert checklist string to array
  const checklistItems = task.checklist
    ? task.checklist.split(',').map((item) => item.trim())
    : [];

  // Date formatting function
  const formatDate = (dateInput: string | Date): string => {
    try {
      const date =
        typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return typeof dateInput === 'string'
        ? dateInput
        : dateInput.toISOString();
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md overflow-hidden border-l-4 ${
        task.status === 'done' ? 'border-green-500' : 'border-yellow-500'
      }`}
    >
      <div className='p-6'>
        <div className='flex justify-between items-start'>
          <div>
            <h2 className='text-xl font-bold text-gray-800'>{task.name}</h2>
            <TaskStatus status={task.status} />
          </div>
          <span className='text-sm text-gray-500'>Task #{task.id}</span>
        </div>

        <p className='mt-3 text-gray-600'>{task.description}</p>

        {/* Checklist display */}
        {checklistItems.length > 0 && (
          <div className='mt-4'>
            <h3 className='font-medium text-gray-700 mb-2'>Checklist:</h3>
            <ul className='space-y-1'>
              {checklistItems.map((item, index) => (
                <li key={index} className='flex items-center'>
                  <input
                    type='checkbox'
                    checked={task.status === 'done'}
                    readOnly
                    className='mr-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                  />
                  <span className='text-gray-600'>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Date display */}
        <div className='mt-4 grid grid-cols-2 gap-4 text-sm'>
          <div>
            <span className='text-gray-500'>Start Date:</span>
            <p className='text-gray-700'>{formattedStartDate}</p>
          </div>
          <div>
            <span className='text-gray-500'>Deadline:</span>
            <p className='text-gray-700'>{formattedDeadline}</p>
          </div>
        </div>

        {/* Conditional rendering for photos and comments */}
        {task.photos && task.photos.length > 0 && (
          <PhotoGallery photos={task.photos} />
        )}
        {task.comments && task.comments.length > 0 && (
          <CommentList comments={task.comments} />
        )}
      </div>
    </div>
  );
};
