import { connectToDatabase } from "@/lib/db";
import { Note } from "@/lib/models/Note";
import { StudyLog } from "@/lib/models/StudyLogs";
import BarCard from "@/components/barCard";
import Card from "@/components/Card";

export default async function DashboardStats({ username }: { username: string }) {
    // 1. Connect to Database
    await connectToDatabase();

    // 2. Fetch data specifically for this user
    const totaNotes = await Note.countDocuments({ username });
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const logs = await StudyLog.find({
        username,
        createdAt: { $gte: sevenDaysAgo }
    });

    // 3. Compute Weekly study hours
    const totalDurationSeconds = logs.reduce((acc: any, log: any) => acc + log.duration, 0);
    const totalStudyHours = (totalDurationSeconds / 3600).toFixed(1);

    // 4. Calculate Best Picks (Top 3 studied notes)
    const noteTimeMap: { [key: string]: { heading: string; duration: number } } = {};
    logs.forEach((log: any) => {
        if (!noteTimeMap[log.noteId]) {
            noteTimeMap[log.noteId] = { heading: log.noteHeading, duration: 0 };
        }
        noteTimeMap[log.noteId].duration += log.duration;
    });

    const sortedNotes = Object.values(noteTimeMap).map(n => ({
        heading: n.heading,
        hours: parseFloat((n.duration / 3600).toFixed(2))
    })).sort((a, b) => b.hours - a.hours);

    const note1 = sortedNotes[0]?.hours || 0;
    const label1 = sortedNotes[0]?.heading || "No Data";
    const note2 = sortedNotes[1]?.hours || 0;
    const label2 = sortedNotes[1]?.heading || "No Data";
    const note3 = sortedNotes[2]?.hours || 0;
    const label3 = sortedNotes[2]?.heading || "No Data";

    // 5. Render cards and chart grid
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card heading={"Total Notes"} counter={String(totaNotes)} />
            <Card heading={"Weekly Study Time"} counter={`${totalStudyHours}h`} />
            <BarCard
                note1={note1} label1={label1}
                note2={note2} label2={label2}
                note3={note3} label3={label3} 
            />
        </div>
    );
}
