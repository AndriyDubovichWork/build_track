// types.ts
export interface Project {
  id: string;
  name: string;
  location: string;
  start_date: string;
  deadline_date: string;
}

export type TaskStatus = 'done' | 'in-progress';

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  description: string;
  photos: Photo[];
  comments: Comment[];
}

export interface Photo {
  id: string;
  url: string;
}

export interface Comment {
  id: string;
  user: string;
  text: string;
  created_at: string;
}

export type TabType = 'main' | 'tasks' | 'materials';
