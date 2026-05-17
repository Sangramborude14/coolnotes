import { connectToDatabase } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import { StudyLog } from "@/lib/models/StudyLogs";
import {auth} from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import BarCard from "@/components/barCard";
import Card from "@/components/Card";


export default async function Home() {
  
  await connectToDatabase();
  const session = await auth.api.getSession({headers: await headers()});

  if(!session){
    redirect("/login");
  }

  const username = session.user.name;
  const totaNotes = await Note.countDocuments({username});
  const sevenDaysAgo = new Date(Date.now() - 7*24*60*60*1000)
  const logs = await StudyLog.find({
    username,
    createdAt: {$gte: sevenDaysAgo}
  })

  const totalDurationSeconds = logs.reduce((acc: any,log: any) => acc + log.duration,0)
  const totalStudyHours = (totalDurationSeconds/3600).toFixed(1)

  const noteTimeMap: {[key:string]: {heading: string; duration: number}} = {};

  logs.forEach((log: any) => {
    if(!noteTimeMap[log.noteId]){
      noteTimeMap[log.noteId] = {heading: log.noteHeading,duration: 0}
    }
    noteTimeMap[log.noteId].duration += log.duration;
  });

  const sortedNotes = Object.values(noteTimeMap).map(n => ({
    heading: n.heading,
    hours: parseFloat((n.duration/3600).toFixed(2))
  })).sort((a,b) => b.hours - a.hours)

  const note1 = sortedNotes[0]?.hours || 0;
  const label1 = sortedNotes[0]?.heading || "No Data";
    const note2 = sortedNotes[1]?.hours || 0;
    const label2 = sortedNotes[1]?.heading || "No Data";
    const note3 = sortedNotes[2]?.hours || 0;
    const label3 = sortedNotes[2]?.heading || "No Data";
    
  return (
   <>
   <div className="space-y-10 p-8 min-h-screen">
    <header className="border-b border-white/5 pb-6">
    <h1 className="text-7xl uppercase font-black text-slate-500 tracking-wider"
    >DevNotes</h1>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8
    ">
      <Card heading={"Total Notes"} counter={String(totaNotes)}/>
      <Card heading={"Weekly Study Time"} counter={`${totalStudyHours}`}/>
      <BarCard
       note1={note1} label1={label1}
       note2={note2} label2={label2}
       note3={note3} label3={label3} />

    </div>
   </div>
   </>
  );
}

