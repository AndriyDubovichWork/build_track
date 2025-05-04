// components/Comment/CommentItem.tsx

import { Comment } from '@/app/types';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem = ({ comment }: CommentItemProps) => (
  <div className='bg-gray-50 p-3 rounded-lg'>
    <div className='flex justify-between items-center'>
      <span className='font-medium text-gray-800'>{comment.user}</span>
      <span className='text-xs text-gray-500'>{comment.created_at}</span>
    </div>
    <p className='mt-1 text-gray-700'>{comment.text}</p>
  </div>
);
