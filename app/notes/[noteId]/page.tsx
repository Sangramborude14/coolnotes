"use client"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState,use,useRef } from "react";

export default function ViewNote({ params } : { params: Promise<{noteId:string}>}){
const [note,setNote] = useState<any>(null)
const {noteId} = use(params)
const headingRef = useRef("")

useEffect(() => {
    if(note?.heading){
        headingRef.current = note.heading;
    }
},[note])

useEffect(() => {
    const startTime = Date.now();

    return () => {
        const endTime = Date.now();
        const duration = Math.floor((endTime - startTime) / 1000);
    
        if (duration > 0 && headingRef.current) {
            fetch("/api/study-time",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({
                    noteId,
                    noteHeading: headingRef.current,
                    duration,
                }),
                keepalive: true
            }).catch(err => console.error("failed to log study session,err"))
        }
    }

},[noteId])

useEffect(() => {
    async function getNote() {
        try{
            
            const response = await fetch(`/api/notes/${noteId}`)
            const data = await response.json();

            setNote(data)
        }catch(error){
            console.error(`error fetching data from api`)
        }
    }
    getNote();
    },[noteId])

return (
    <>
    <div className="min-h-screen p-8 md:p-24 max-w-5xl mx-auto">
        <Link href="/notes/mynotes"
         className="inline-flex items-center gap-2 text-slate-500 hover:text-primary mb-12 transition-all group">
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
        Back to My Notes
        </Link>
        <div className="bg-white/5 rounded-3xl p-8 md:16 backdrop-blur-xl border border-white/10 shadow-2xl">
             <h1 className="text-5xl md:text-7xl font-black bg-linear-to-r from-white to-slate-500 bg-clip-text text-transparent mb-12 leading-tight">
            {note?.heading}
        </h1>
        
        <div className="h-1 w-24 bg-primary/30 rounded-full mb-12"/>
        <p className="text-xl md:text-2xl text-slate-200 leading-relaxed whitespace-pre-wrap font-medium">
            {note?.content}
        </p>
        </div>
        </div>
    </>
)
}
