// lib/db.ts
import { sql } from '@vercel/postgres';
import { Company, User, Room, Task } from './types';

// Company Operations
export async function createCompany(
  company: Omit<Company, 'id'>
): Promise<Company> {
  const { rows } = await sql`
    INSERT INTO Company (Name, Unique_ID, Telephone_number)
    VALUES (${company.name}, ${company.unique_id}, ${company.telephone_number})
    RETURNING *
  `;
  return rows[0] as Company;
}

export async function getCompanyById(id: number): Promise<Company | null> {
  const { rows } = await sql`
    SELECT * FROM Company WHERE Id = ${id}
  `;
  return rows.length ? (rows[0] as Company) : null;
}

export async function getAllCompanies(): Promise<Company[]> {
  const { rows } = await sql`SELECT * FROM Company`;
  return rows as Company[];
}

// User Operations
export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const { rows } = await sql`
    INSERT INTO [User] (Full_name, Telephone_number)
    VALUES (${user.full_name}, ${user.telephone_number})
    RETURNING *
  `;
  return rows[0] as User;
}

export async function getUserById(id: number): Promise<User | null> {
  const { rows } = await sql`
    SELECT * FROM [User] WHERE Id = ${id}
  `;
  return rows.length ? (rows[0] as User) : null;
}

// Room Operations
export async function createRoom(room: Omit<Room, 'id'>): Promise<Room> {
  const { rows } = await sql`
    INSERT INTO Room (
      Name, Company_Id, User_Id, Location, 
      Description, Start_date, Deadline_date, Type_of_Build
    )
    VALUES (
      ${room.name}, ${room.company_id}, ${room.user_id}, ${room.location},
      ${room.description || null}, ${room.start_date.toISOString()}, 
      ${room.deadline_date.toISOString()}, ${room.type_of_build}
    )
    RETURNING *
  `;
  return rows[0] as Room;
}

export async function getRoomsByCompany(companyId: number): Promise<Room[]> {
  const { rows } = await sql`
    SELECT * FROM Room WHERE Company_Id = ${companyId}
  `;
  return rows as Room[];
}

export async function getRoomWithDetails(roomId: number): Promise<{
  room: Room;
  company: Company;
  user: User;
  tasks: Task[];
} | null> {
  const roomResult = await sql`SELECT * FROM Room WHERE Id = ${roomId}`;
  if (!roomResult.rows.length) return null;

  const room = roomResult.rows[0] as Room;

  const [companyResult, userResult, tasksResult] = await Promise.all([
    sql`SELECT * FROM Company WHERE Id = ${room.company_id}`,
    sql`SELECT * FROM [User] WHERE Id = ${room.user_id}`,
    sql`SELECT * FROM Tasks WHERE Room_Id = ${roomId}`,
  ]);

  return {
    room,
    company: companyResult.rows[0] as Company,
    user: userResult.rows[0] as User,
    tasks: tasksResult.rows as Task[],
  };
}

// Task Operations
export async function createTask(task: Omit<Task, 'id'>): Promise<Task> {
  const { rows } = await sql`
    INSERT INTO Tasks (
      Room_Id, Name, Status, Description, 
      Checklist, Start_date, Deadline_date
    )
    VALUES (
      ${task.room_id}, ${task.name}, ${task.status}, 
      ${task.description || null}, ${task.checklist || null},
      ${task.start_date.toISOString()}, ${task.deadline_date.toISOString()}
    )
    RETURNING *
  `;
  return rows[0] as Task;
}

export async function updateTaskStatus(
  taskId: number,
  status: 'done' | 'in process'
): Promise<Task> {
  const { rows } = await sql`
    UPDATE Tasks 
    SET Status = ${status} 
    WHERE Id = ${taskId}
    RETURNING *
  `;
  return rows[0] as Task;
}

export async function getTasksByRoom(roomId: number): Promise<Task[]> {
  const { rows } = await sql`
    SELECT * FROM Tasks WHERE Room_Id = ${roomId}
  `;
  return rows as Task[];
}
