import Image from "next/image";
import { sql } from "@vercel/postgres";
import {POST} from "./api/route"

export default async function Home() {
  const domain = process.env.DOMAIN;
  const reactappfoo = process.env.REACT_APP_ABOUT;
  const reactappbar = process.env.REACT_APP_CONTACTS;
  console.log(`reactappfoo - ${reactappfoo}`)
  console.log(`reactappbar - ${reactappbar}`)

  // const { rows } = await sql`SELECT * from CARTS where user_id=${params.cards}`;
  return (
    <main className="text-center">
      <>
        {domain}
      </>
      
    </main>
  );
}
