const { db } = require('@vercel/postgres');
const { users} = require('../mocks/users');

const bcrypt = require('bcrypt');

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

		// Insert data into the "users" table
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
			users: insertedUsers,
		};
	} catch (error) {
		console.error('Error seeding users:', error);
		throw error;
	}
}


// pages/api/hello_world.js
import postgres from "postgres";

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;


const conn = postgres({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,z
  port: 5432,
  ssl: "require",
});

function selectAll() {
  return conn.query("CREATE TABLE IF NOT EXISTS users (
	id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
  ");
}

// https://neon.tech/docs/connect/connect-from-any-app
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