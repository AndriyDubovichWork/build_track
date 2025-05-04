// components/Task/TaskCard.tsx
import { TaskStatus } from './TaskStatus';
import { PhotoGallery } from './PhotoGallery';
import { CommentList } from './CommentList';
import { Task } from '@/app/types';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className='bg-white rounded-xl shadow-md overflow-hidden border-l-4 border-green-500'>
      <div className='p-6'>
        <div className='flex justify-between items-start'>
          <div>
            <h2 className='text-xl font-bold text-gray-800'>{task.name}</h2>
            <TaskStatus status={task.status} />
          </div>
          <span className='text-sm text-gray-500'>Task #{task.id}</span>
        </div>

        <p className='mt-3 text-gray-600'>{task.description}</p>

        {task.photos.length > 0 && <PhotoGallery photos={task.photos} />}
        {task.comments.length > 0 && <CommentList comments={task.comments} />}
      </div>
    </div>
  );
};
