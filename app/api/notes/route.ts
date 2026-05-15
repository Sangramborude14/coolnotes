import { connectToDatabase } from "@/lib/db";
import {Note} from "@/lib/models/Note"
import { NextResponse } from "next/server";
import {auth} from "@/lib/auth";
import {headers} from "next/headers";

export async function POST(req: Request){
    try{
        await connectToDatabase();

        const session = await auth.api.getSession({
            headers:await
            headers()
        })

        if(!session) {
            return NextResponse.json({error: "Unauthorized"},{status: 401})
        }
        const body = await req.json();
        const {heading,content} = body;
     
        const newNote = await Note.create({
            username: session.user.name,
            noteId: Date.now() + heading.replace(/\s+/g,'-'),
            heading,
            content,
            private: true
        })
        return NextResponse.json(newNote,{status: 201});
}catch(error){
    console.error("Error saving the Note")
    return NextResponse.json({error: "Failed to save note"},{status: 500});
}}