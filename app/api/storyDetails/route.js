import { db } from "@/config/db";
import { storyTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const {searchParams} = new URL(req.url);
    const storyId = searchParams.get('storyId');

    const result = await db.select().from(storyTable).where(eq(storyTable.storyId, storyId));

    return NextResponse.json(result[0]);
}