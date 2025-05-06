// scripts/generateMockData.ts
import { createCompany, createUser, createRoom, createTask } from './DB/db';
import { faker } from '@faker-js/faker';
import { Company, Room, User } from './DB/types';
import { Task } from '../types';

// Types for mock data generation

// @typescript-eslint/no-empty-object-type
type MockCompany = Omit<Company, 'id'>;
type MockUser = Omit<User, 'id'>;
type MockRoom = Omit<Room, 'id'>;
type MockTask = Omit<Task, 'id'>;

// Configuration
const NUM_COMPANIES = 3;
const NUM_USERS_PER_COMPANY = 2;
const NUM_ROOMS_PER_COMPANY = 3;
const NUM_TASKS_PER_ROOM = 5;

// Helper functions
function randomStatus(): 'done' | 'in process' {
  return faker.datatype.boolean() ? 'done' : 'in process';
}

function randomFutureDate(days: number): Date {
  return faker.date.soon({ days });
}

// Data generators
function generateCompany(): MockCompany {
  return {
    name: faker.company.name(),
    unique_id: faker.string.alphanumeric(6).toUpperCase(),
    telephone_number: faker.phone.number(),
  };
}

function generateUser(): MockUser {
  return {
    full_name: faker.person.fullName(),
    telephone_number: faker.phone.number(),
  };
}

function generateRoom(companyId: number, userId: number): MockRoom {
  return {
    name: `${faker.word.adjective()} ${faker.word.noun()}`,
    company_id: companyId,
    user_id: userId,
    location: `${faker.location.city()}, ${faker.location.streetAddress()}`,
    description: faker.lorem.sentence(),
    start_date: new Date(),
    deadline_date: randomFutureDate(60),
    type_of_build: faker.helpers.arrayElement([
      'Commercial',
      'Industrial',
      'Residential',
    ]),
  };
}
function generateUUID(): string {
  return crypto.randomUUID();
}
function generateImageUrl(): string {
  const categories = [
    'nature',
    'architecture',
    'people',
    'animals',
    'technology',
  ];
  const randomCategory = faker.helpers.arrayElement(categories);
  return `https://source.unsplash.com/400x300/?${randomCategory}`;
}
function generateTask(roomId: number): MockTask {
  const startDate = randomFutureDate(5);

  return {
    room_id: roomId,
    name: faker.lorem.words(3),
    status: randomStatus(),
    description: faker.lorem.sentences(2),
    checklist: faker.lorem.words(5).split(' ').join(', '),
    start_date: startDate,
    deadline_date: randomFutureDate(10),
    photos: [
      {
        id: generateUUID(), // Use custom UUID generator
        url: generateImageUrl(),
      },
      {
        id: generateUUID(),
        url: generateImageUrl(),
      },
    ],
    comments: [
      {
        id: generateUUID(),
        user: faker.name.fullName(),
        text: faker.lorem.sentence(),
        created_at: new Date().toISOString(),
      },
      {
        id: generateUUID(),
        user: faker.name.fullName(),
        text: faker.lorem.sentence(),
        created_at: new Date().toISOString(),
      },
    ],
  };
}

// Main function to generate and insert mock data
export default async function generateMockData() {
  console.log('Starting mock data generation...');

  try {
    // Generate companies
    const companies: Company[] = [];
    for (let i = 0; i < NUM_COMPANIES; i++) {
      const companyData = generateCompany();
      const result = await createCompany(companyData);

      if ('error' in result) {
        console.error(`Error creating company: ${result.error}`);
        continue;
      }

      companies.push(result);
      console.log(`Created company: ${result.name}`);
    }

    // Generate users for each company
    const users: User[] = [];
    for (const company of companies) {
      for (let i = 0; i < NUM_USERS_PER_COMPANY; i++) {
        const userData = generateUser();
        const result = await createUser(userData);

        if ('error' in result) {
          console.error(`Error creating user: ${result.error}`);
          continue;
        }

        users.push(result);
        console.log(
          `Created user: ${result.full_name} for company ${company.name}`
        );
      }
    }

    // Generate rooms for each company
    const rooms: Room[] = [];
    for (const company of companies) {
      const companyUsers = users.filter(
        (u) =>
          users.indexOf(u) % NUM_USERS_PER_COMPANY ===
          companies.indexOf(company) % NUM_COMPANIES
      );

      for (let i = 0; i < NUM_ROOMS_PER_COMPANY; i++) {
        const user = faker.helpers.arrayElement(companyUsers);
        const roomData = generateRoom(company.id, user.id);
        const result = await createRoom(roomData);

        if ('error' in result) {
          console.error(`Error creating room: ${result.error}`);
          continue;
        }

        rooms.push(result);
        console.log(`Created room: ${result.name} for company ${company.name}`);
      }
    }

    // Generate tasks for each room
    for (const room of rooms) {
      for (let i = 0; i < NUM_TASKS_PER_ROOM; i++) {
        const taskData = generateTask(i);
        const result = await createTask(taskData);

        if ('error' in result) {
          console.error(`Error creating task: ${result.error}`);
          continue;
        }

        console.log(`Created task: ${result.name} for room ${room.name}`);
      }
    }

    console.log('✅ Mock data generation completed successfully!');
    console.log(`Generated: 
      - ${companies.length} companies
      - ${users.length} users
      - ${rooms.length} rooms
      - ${rooms.length * NUM_TASKS_PER_ROOM} tasks`);
  } catch (error) {
    console.error('❌ Error during mock data generation:', error);
  }
}
