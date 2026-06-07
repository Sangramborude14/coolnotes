import { connectToDatabase } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { noteId: string } }) {
    try {
        await connectToDatabase();
        const { noteId } = await params;
        const specificNote = await Note.findOne({ noteId: noteId })
        return NextResponse.json(specificNote)
    } catch (error) {
        return NextResponse.json({ error: "could'nt connect to DB" }, { status: 500 })
    }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ noteId: string }> }) {
    try {
        await connectToDatabase();  
        const { noteId } = await params;
        const body = await req.json();

        const updateNote = await Note.findOneAndUpdate(
            { noteId },
            { $set: body },
            { new: true }
        );
        return NextResponse.json(updateNote)
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 })
    }
}