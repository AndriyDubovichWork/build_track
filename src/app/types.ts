// types.ts
export interface Project {
  id: string;
  name: string;
  location: string;
  start_date: string;
  deadline_date: string;
}

export type TaskStatus = 'done' | 'in process';

export interface Task {
  id: number;
  name: string;
  status: TaskStatus;
  description: string;
  photos: Photo[];
  comments: Comment[];
  room_id: number;
  checklist: string;
  start_date: Date;
  deadline_date: Date;
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

export type TabType = 'main' | 'tasks' | 'materials' | 'companies' | 'rooms';

export type Company = {
  id: number;
  name: string;
  telephone_number: string;
  unique_id: string;
};
export interface Room {
  id: number;
  name: string;
  company_id: number;
  user_id: number;
  location: string;
  description: string;
  start_date: Date;
  deadline_date: Date;
  type_of_build: string;
}
