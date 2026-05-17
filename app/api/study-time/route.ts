import { connectToDatabase } from "@/lib/db";
import { StudyLog } from "@/lib/models/StudyLogs";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { error } from "console";

export async function POST(req:Request) {
    try{
        await connectToDatabase();

        const session = await auth.api.getSession({
            headers: await headers()
        })
        if (!session){
            return NextResponse.json({error: "Unauthorized"},{status: 401})
        }

        const body = await req.json();
        const {noteId,noteHeading,duration}  = body;

        if( !noteId || !noteHeading || duration === undefined) {
            return NextResponse.json({error: "Missing Feilds"},{status:400});
        }

        const newLog = await StudyLog.create({
            username: session.user.name,
            noteId,
            noteHeading,
            duration
        })
        return NextResponse.json(newLog, {status: 201})
    }catch(error){
        console.error("error saving studyLog")
        return NextResponse.json({error: "failed to save log"},{status: 500})
    }

}

export async function GET(req:Request){
    try{
        await connectToDatabase();
        const session = await auth.api.getSession({
        headers: await headers()
        })

        if(!session){
            return NextResponse.json({error: "Unauthorized"},{status: 401});
        }
        const sevenDaysAgo = new Date(Date.now() - 7*24*60*60*1000);

        const logs = await StudyLog.find({
            username: session.user.name,
            createdAt: { $gte: sevenDaysAgo},// greater than equal to 
        })
        return NextResponse.json(logs)
    }catch(error){
        console.error(`error fetching study logs`)
        return NextResponse.json({error:"Failed to fetch logs"},{status: 500});
    }
}