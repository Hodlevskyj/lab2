// const { createClient } = require('@vercel/postgres');
// const bcrypt = require('bcrypt');
// require('dotenv').config();
// const {users} = require('../mocks/users')


// async function seedUsers(client) {
//   try {
//     await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

//     await client.query(`
//       CREATE TABLE IF NOT EXISTS users (
//         id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         name VARCHAR(255) NOT NULL,
//         email TEXT NOT NULL UNIQUE,
//         password TEXT NOT NULL
//       )
//     `);

//     console.log(`Created "users" table`);

//     const insertedUsers = await Promise.all(
//       users.map(async (user) => {
//         const hashedPassword = await bcrypt.hash(user.password, 10);
//         return client.sql`
//         INSERT INTO users (id, name, email, password)
//         VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//       }),
//     );

//     console.log(`Seeded ${insertedUsers.length} users`);

//     return {
//       createTable: 'Success',
//       users: insertedUsers
//     };
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error;
//   }
// }

// async function main() {
//   //neontech
//   const client = createClient({
//     connectionString: process.env.POSTGRES_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   });

//   await client.connect();
//   await seedUsers(client);
//   await client.end();
// }

// main().catch((err) => {
//   console.error('An error occurred while attempting to seed the database:', err);
// });

//vercel

const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');
const {users} = require('../mocks/users')

async function seedUsers(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      );
    `;

    console.log(`Created "users" table`);

    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users`);

    
    return {
      createTable,
      users: insertedUsers
    };
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedUsers(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
