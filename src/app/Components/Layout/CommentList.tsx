import { Comment } from '@/app/types';
import { CommentItem } from './CommentItem';

// components/Comment/CommentList.tsx
interface CommentListProps {
  comments: Comment[];
}

export const CommentList = ({ comments }: CommentListProps) => (
  <div className='mt-6'>
    <h4 className='text-sm font-medium text-gray-500 mb-2'>Comments:</h4>
    <div className='space-y-3'>
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  </div>
);
