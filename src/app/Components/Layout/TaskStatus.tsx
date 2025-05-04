// components/Task/TaskStatus.tsx
import { TaskStatus as TaskStatusType } from '@/app/types';

interface TaskStatusProps {
  status: TaskStatusType;
}

export const TaskStatus = ({ status }: TaskStatusProps) => (
  <div className='flex items-center mt-1'>
    <span
      className={`px-2 py-1 text-xs rounded-full ${
        status === 'done'
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      }`}
    >
      {status === 'done' ? 'Completed' : 'In Progress'}
    </span>
  </div>
);
