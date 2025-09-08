import { db } from "@/config/db";
import { storyTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const user = await currentUser()

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const email = user?.primaryEmailAddress?.emailAddress || user?.emailAddresses?.[0]?.emailAddress

        if (!email) {
            return NextResponse.json({ error: 'No email found on current user' }, { status: 400 })
        }

        const stories = await db.select().from(storyTable).where(eq(storyTable.email, email))

        return NextResponse.json(stories)
    } catch (err) {
        console.error('GET /api/my-stories error', err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}