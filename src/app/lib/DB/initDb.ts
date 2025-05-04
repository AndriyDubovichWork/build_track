// src/app/lib/DB/initDb.ts
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.DATABASE_URL!);

export async function initializeDatabase() {
  try {
    // Create tables with PostgreSQL-compatible syntax
    await sql`
      CREATE TABLE IF NOT EXISTS Company (
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(255) NOT NULL,
        Unique_ID VARCHAR(50) UNIQUE NOT NULL,
        Telephone_number VARCHAR(20) NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS "User" (
        Id SERIAL PRIMARY KEY,
        Full_name VARCHAR(255) NOT NULL,
        Telephone_number VARCHAR(20) NOT NULL
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS Room (
        Id SERIAL PRIMARY KEY,
        Name VARCHAR(255) NOT NULL UNIQUE,
        Company_Id INT NOT NULL,
        User_Id INT NOT NULL,
        Location TEXT NOT NULL,
        Description TEXT,
        Start_date DATE NOT NULL,
        Deadline_date DATE NOT NULL,
        Type_of_Build VARCHAR(100) NOT NULL,
        FOREIGN KEY (Company_Id) REFERENCES Company(Id) ON DELETE CASCADE,
        FOREIGN KEY (User_Id) REFERENCES "User"(Id) ON DELETE CASCADE
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS Tasks (
        Id SERIAL PRIMARY KEY,
        Room_Id INT NOT NULL,
        Name VARCHAR(255) NOT NULL,
        Status VARCHAR(20) CHECK (Status IN ('done', 'in process')) NOT NULL,
        Description TEXT,
        Checklist TEXT,
        Start_date DATE NOT NULL,
        Deadline_date DATE NOT NULL,
        FOREIGN KEY (Room_Id) REFERENCES Room(Id) ON DELETE CASCADE
      )
    `;

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
