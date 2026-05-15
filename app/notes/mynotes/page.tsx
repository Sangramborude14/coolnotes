"use client"
import React from "react"
import {useState , useEffect} from "react";
import Link from "next/link";
import {Eye,Pencil,Trash2} from "lucide-react"


export default function MyNotes() {
    const [notes,setNotes] = useState([]);

    
useEffect(() => {
    async function fetchMyNotes() {
        const response = await fetch("/api/notes");
        const data = await response.json()
        
        setNotes(data)
        }
        fetchMyNotes();
},[]);

    const handleDelete = async (noteId: string) => {
         if(!confirm("u sure ??🗑️")) return;
        
         const res = await fetch("/api/notes",{
            method: "DELETE",
            body: JSON.stringify({noteId})
         })
         if(res.ok){
            setNotes(notes.filter((note:any) => note.noteId !== noteId));
         }else{
            alert("Delete failed")
         }
    };

    return(<>
    <div className="p-8 ">
        <h1 className=" inline-block transform text-7xl uppercase font-bold mb-8 text-slate-500 mask-b-from-neutral-700  transform-scale-y-150 origin-top text-right py-4 px-0 ml-10 tracking-wider ">
            Your Personal Notes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 item-st">
        {notes.map((note) =>
        <div key={note.noteId} className="bg-gray-400/10 rounded-xl p-6 m-1 backdrop-blur-2xl-md shadow-xl border border-white/20 flex flex-col h-96">
            <div className="flex-1">
                <h1 className="text-center text-xl mb-4 font-extrabold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-1">{note.heading}</h1>
            <p className="overflow-hidden line-clamp-8">{note.content}</p>
            </div>
             <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <Link href={`/notes/${note.noteId}`} className="p-3 rounded-full bg-white/5 hover:bg-primary/20 hover:text-green-400 transition-all duration-300">
                <Eye size={25}/>
                </Link>
                <Link href={`/notes/edit/${note.noteId}`} className="p-3 rounded-full bg-white/5 hover:bg-primary/20 hover:text-yellow-400 transition-all duration-300">
                <Pencil size={25}/>
                </Link>
                <button onClick={() => handleDelete(note.noteId)} href={`/notes/${note.noteId}`} className="p-3 rounded-full bg-white/5 hover:bg-primary/20 hover:text-red-600 transition-all duration-300">
                <Trash2 size={25}/>
                </button>
            </div>
            </div>)}
        </div>
        <div>
        </div>
    </div>
    </>)
}