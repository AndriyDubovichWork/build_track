// lib/db.ts
import { neon } from '@neondatabase/serverless';
import { Company, User, Room, Task } from './types';

// Initialize Neon connection
const sql = neon(process.env.DATABASE_URL!);

// Utility function to handle single row results
// eslint-disable-next-line
const singleRow = <T>(rows: any[]): T | null =>
  rows.length ? (rows[0] as T) : null;

// Company Operations
export async function createCompany(
  company: Omit<Company, 'id'>
): Promise<Company | { error: string }> {
  try {
    const rows = await sql`
      INSERT INTO Company (Name, Unique_ID, Telephone_number)
      VALUES (${company.name}, ${company.unique_id}, ${company.telephone_number})
      RETURNING *
    `;
    return rows[0] as Company;
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.code === '23505') {
      // Unique constraint violation
      return { error: 'Company with this Unique_ID already exists' };
    }
    console.error('Database Error:', error);
    return { error: 'Failed to create company' };
  }
}

export async function getCompanyById(id: number): Promise<Company | null> {
  try {
    const rows = await sql`SELECT * FROM Company WHERE Id = ${id}`;
    return singleRow<Company>(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}

export async function getAllCompanies(): Promise<
  Company[] | { error: string }
> {
  try {
    return (await sql`SELECT * FROM Company`) as Company[];
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Failed to fetch companies' };
  }
}

// User Operations
export async function createUser(
  user: Omit<User, 'id'>
): Promise<User | { error: string }> {
  try {
    const rows = await sql`
      INSERT INTO "User" (Full_name, Telephone_number)
      VALUES (${user.full_name}, ${user.telephone_number})
      RETURNING *
    `;
    return rows[0] as User;
    // eslint-disable-next-line
  } catch (error: any) {
    console.error('Database Error:', error);
    return { error: 'Failed to create user' };
  }
}

export async function getUserById(id: number): Promise<User | null> {
  try {
    const rows = await sql`SELECT * FROM "User" WHERE Id = ${id}`;
    return singleRow<User>(rows);
  } catch (error) {
    console.error('Database Error:', error);
    return null;
  }
}

// Room Operations
export async function createRoom(
  room: Omit<Room, 'id'>
): Promise<Room | { error: string }> {
  try {
    const rows = await sql`
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
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.code === '23503') {
      // Foreign key violation
      return { error: 'Invalid Company_Id or User_Id' };
    }
    if (error.code === '23505') {
      // Unique constraint violation
      return { error: 'Room with this name already exists' };
    }
    console.error('Database Error:', error);
    return { error: 'Failed to create room' };
  }
}

export async function getRoomsByCompany(
  companyId: number
): Promise<Room[] | { error: string }> {
  try {
    return (await sql`SELECT * FROM Room WHERE Company_Id = ${companyId}`) as Room[];
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Failed to fetch rooms' };
  }
}

export async function getRoomWithDetails(roomId: number): Promise<
  | {
      room: Room;
      company: Company;
      user: User;
      tasks: Task[];
    }
  | { error: string }
  | null
> {
  // eslint-disable-next-line
  const pool = (sql as any).pool; // Access the underlying pool for transactions
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const roomResult = await client.query('SELECT * FROM Room WHERE Id = $1', [
      roomId,
    ]);
    if (roomResult.rows.length === 0) return null;

    const room = roomResult.rows[0] as Room;

    const [companyResult, userResult, tasksResult] = await Promise.all([
      client.query('SELECT * FROM Company WHERE Id = $1', [room.company_id]),
      client.query('SELECT * FROM "User" WHERE Id = $1', [room.user_id]),
      client.query('SELECT * FROM Tasks WHERE Room_Id = $1', [roomId]),
    ]);

    await client.query('COMMIT');

    return {
      room,
      company: companyResult.rows[0] as Company,
      user: userResult.rows[0] as User,
      tasks: tasksResult.rows as Task[],
    };
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Database Error:', error);
    return { error: 'Failed to fetch room details' };
  } finally {
    client.release();
  }
}

// Task Operations
export async function createTask(
  task: Omit<Task, 'id'>
): Promise<Task | { error: string }> {
  try {
    const rows = await sql`
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
    // eslint-disable-next-line
  } catch (error: any) {
    if (error.code === '23503') {
      // Foreign key violation
      return { error: 'Invalid Room_Id' };
    }
    console.error('Database Error:', error);
    return { error: 'Failed to create task' };
  }
}

export async function updateTaskStatus(
  taskId: number,
  status: 'done' | 'in process'
): Promise<Task | { error: string }> {
  try {
    const rows = await sql`
      UPDATE Tasks 
      SET Status = ${status} 
      WHERE Id = ${taskId}
      RETURNING *
    `;
    return rows[0] as Task;
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Failed to update task status' };
  }
}

export async function getTasksByRoom(
  roomId: number
): Promise<Task[] | { error: string }> {
  try {
    return (await sql`SELECT * FROM Tasks WHERE Room_Id = ${roomId}`) as Task[];
  } catch (error) {
    console.error('Database Error:', error);
    return { error: 'Failed to fetch tasks' };
  }
}
