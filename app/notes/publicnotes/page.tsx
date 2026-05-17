"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";


export default function PublicNotes() {
    const [notes, setNotes] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    // 🛡️ Safety: Only filter if 'notes' is an array, and check if 'heading' exists
    const filteredNotes = Array.isArray(notes) 
        ? notes.filter((note: any) => 
            note.heading?.toLowerCase().includes(searchQuery.toLowerCase()) && note.private == false
          )
        : [];

    useEffect(() => {
        async function fetchMyNotes() {
            try {
                const response = await fetch("/api/notes");
                const data = await response.json();
                
                // Only set if we actually got an array
                if (Array.isArray(data)) {
                    setNotes(data);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMyNotes();
    }, []);


    return (
        <div className="p-8 min-h-screen">
            <h1 className="inline-block text-7xl uppercase font-bold mb-12 text-slate-500 tracking-wider">
                Your Personal Notes
            </h1>

            {/* 🔍 Styled Search Bar */}
            <div className="relative max-w-xl mb-12 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors" size={20} />
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    placeholder="Search" 
                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none focus:ring-2 focus:ring-primary focus:bg-white/10 transition-all shadow-xl"
                />
            </div>

            {isLoading ? (
                <div className="text-slate-500 animate-pulse">Gathering your notes...</div>
            ) : filteredNotes.length === 0 ? (
                <div className="text-slate-500 italic">No notes found. Try searching for something else or create a new one!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNotes.map((note: any) => (
                        <div key={note.noteId} onClick={() => router.push(`/notes/${note.noteId}`)} className="bg-white/5 rounded-3xl p-8 flex flex-col h-96 backdrop-blur-xl shadow-2xl border border-white/10 hover:border-white/20 transition-all group">
                            <div className="flex-1 overflow-hidden">
                                <h2 className="text-2xl font-bold bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent mb-4 truncate">
                                    {note.heading}
                                </h2>
                                <p className="text-slate-400 line-clamp-6 leading-relaxed">
                                    {note.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
