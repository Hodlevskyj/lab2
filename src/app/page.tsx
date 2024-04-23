import Image from "next/image";
import { sql } from "@vercel/postgres";

export default async function Home() {
  const domain = process.env.DOMAIN;
  const reactappfoo = process.env.REACT_APP_ABOUT;
  const reactappbar = process.env.REACT_APP_CONTACTS;
  console.log(`reactappfoo - ${reactappfoo}`)
  console.log(`reactappbar - ${reactappbar}`)

  // const { rows } = await sql`SELECT * from CARTS where user_id=${params.cards}`;
  return (
    // <main className="flex min-h-screen flex-col items-center justify-between p-24">
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <>
        {domain}
        
      </> */}
      <p>{process.env.WELCOME_PUBLIC}</p>
      <ol>
        <li>{reactappbar}</li>
        <li>{reactappfoo}</li>
      </ol>
    </main>
  );
}
