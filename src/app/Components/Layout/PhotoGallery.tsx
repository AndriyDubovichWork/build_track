// components/Media/PhotoGallery.tsx
import { Photo } from '@/app/types';

interface PhotoGalleryProps {
  photos: Photo[];
}

export const PhotoGallery = ({ photos }: PhotoGalleryProps) => (
  <div className='mt-4'>
    <h4 className='text-sm font-medium text-gray-500 mb-2'>Photos:</h4>
    <div className='flex space-x-2'>
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className='w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center'
        >
          <span className='text-xs text-gray-500'>Photo {index + 1}</span>
        </div>
      ))}
    </div>
  </div>
);
