"use client"

import { useState } from "react"

export default function CreateNote() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isPrivate,setIsPrivate] = useState(true);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevents page reload

        try {
            const res = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ heading: title, content: content,private: isPrivate})
            });

            const result = await res.json();

            if (res.ok) {
                alert("Saved successfully! 🚀");
            } else {
                alert(`Error: ${result.error || "Failed to save"}`);
            }
        } catch (error) {
            alert("Network error: Could not reach the server.");
        }
    };


    return (
        <>
            <div
                className="flex flex-col items-center justify-start min-h-screen pt-20">
                <h1 className="text-sm uppercase tracking-widest text-gray-400 text-center pb-3">
                    Create the coolest note possible
                </h1>
                <div>
                    <form onSubmit={handleSave}>
                        <input type="text" id="heading" name="heading" placeholder="Heading" onChange={(e) => setTitle(e.target.value)}
                            className="border-none bg-transparent text-5xl font-bold
                            focus:outline-none text-center w-full mb-8"/>

                        <textarea placeholder="WRITE YOUR NOTES HERE 📝" rows={15} className="bg-transparent border-none focus:outline-none text-xl w-full max-w-6xl px-4 text-center" onChange={(e) => setContent(e.target.value)}>
                        </textarea>

                        <div>
                            <button type="submit" className="border-2 border-white  hover:bg-primary mt-4 p-2 hover:scale-105 transition-all duration-200 transform ">SAVE</button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 mb-8 max-w-xl mx-auto w-full">
    {/* 1. The Labels */}
    <div className="flex flex-col items-start">
        <span className="font-bold text-white">Private Note</span>
        <span className="text-xs text-slate-500 italic">Visible only to you</span>
    </div>

    {/* 2. The Switch */}
    <button 
        type="button" // 👈 CRITICAL: Prevents form from submitting when you toggle
        onClick={() => setIsPrivate(!isPrivate)} 
        className={`w-14 h-8 rounded-full p-1 transition-all duration-500 ${isPrivate ? 'bg-primary' : 'bg-slate-700'}`}
    >
        <div className={`w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 transform ${isPrivate ? 'translate-x-6' : 'translate-x-0'}`}/>
    </button>
</div>

                    </form>
                </div>
            </div>
        </>
    )
}