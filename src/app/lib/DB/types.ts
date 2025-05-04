// types/dbTypes.ts
export interface Company {
    id: number;
    name: string;
    unique_id: string;
    telephone_number: string;
  }
  
  export interface User {
    id: number;
    full_name: string;
    telephone_number: string;
  }
  
  export interface Room {
    id: number;
    name: string;
    company_id: number;
    user_id: number;
    location: string;
    description: string | null;
    start_date: Date;
    deadline_date: Date;
    type_of_build: string;
  }
  
  export interface Task {
    id: number;
    room_id: number;
    name: string;
    status: 'done' | 'in process';
    description: string | null;
    checklist: string | null;
    start_date: Date;
    deadline_date: Date;
  }