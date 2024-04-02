// const { db } = require('@vercel/postgres');
import { db } from "@vercel/postgres";
const { cards } = require("../mocks/cards");
async function seedCards(cards:any) {
    await cards.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await cards.sql`
    CREATE TABLE IF NOT EXISTS cards (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(12) NOT NULL,
      description TEXT NOT NULL UNIQUE,
      img TEXT NOT NULL
    );
  `;

    console.log(`Created "cards" table`);

}

async function main(){
    const cards =await db.connect();
    await seedCards(cards);
    // await cards.end();
}

main().catch((err) => {
	console.error(
		'An error occurred while attempting to seed the database:',
		err,
	);
});