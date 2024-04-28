import { NextResponse } from "next/server";
const { db } = require('@vercel/postgres');

export async function GET(request, context) {
    const { params } = context;
    const userId = params.id;

    try {
        const client = await db.connect();
        const result = await client.query('SELECT * FROM users WHERE id = $1', [userId]);
        await client.end();

        if (result.rows.length === 1) {
            const user = result.rows[0];
            return NextResponse.json({ user }, { status: 200 });
        } else {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json({ message: "Error fetching user", error }, { status: 500 });
    }
}

export async function DELETE(request, context) {
    const { params } = context;
    const userId = params.id;
    try {
        const client = await db.connect();
        await client.query(`DELETE FROM users WHERE id = $1`, [userId]);
        await client.end();

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: "Error deleting user", error }, { status: 500 });
    }
}

export async function PUT(request, context) {
    const { params } = context;
    const userId = params.id;
    const { name, email, password } = await request.json();
    try {
        const client = await db.connect();
        await client.query(`UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4`, [name, email, password, userId]);
        await client.end();

        return NextResponse.json({ message: "User updated successfully" }, { status: 200 });
    } catch (error) {
        console.error('Error updating user:', error);
        return NextResponse.json({ message: "Error updating user", error }, { status: 500 });
    }
}
