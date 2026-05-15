"use client"

import { useState } from "react"

export default function CreateNote(){
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch("/api/notes",{
            method: "POST",
            body: JSON.stringify({heading:title,content:content})
        })
        if (res.ok) alert("saved to database")
    }

    return(
        <>
       <div
       className="flex flex-col items-center justify-start min-h-screen pt-20">
         <h1 className="text-sm uppercase tracking-widest text-gray-400 text-center pb-3">
            Create the coolest note possible
            </h1>
        <div>
            <form>
                <input type="text" id="heading" name="heading" placeholder="Heading" onChange={(e) => setTitle(e.target.value)}
                 className="border-none bg-transparent text-5xl font-bold
                            focus:outline-none text-center w-full mb-8"/>
                
                <textarea placeholder = "WRITE YOUR NOTES HERE 📝" rows={15} className="bg-transparent border-none focus:outline-none text-xl w-full max-w-6xl px-4 text-center" onChange={(e) => setContent(e.target.value)}>
                </textarea>
                
                <div>
                    <button type="submit" className="border-2 border-white  hover:bg-primary mt-4 p-2 hover:scale-105 transition-all duration-200 transform " onClick={handleSave}>SAVE</button>
                </div>
            </form>
        </div>
       </div>
        </>
    )
}