"use client"

import { useState,useEffect,use } from "react"
import { useRouter } from "next/navigation";



    
    export default function EditNote({ params}: {params: Promise<{noteId: string}>}){

    const { noteId } = use(params);
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isLoading,setIsLoading] = useState(true);
    const [isSaving,setIsSaving] = useState(false);

    useEffect(() => {
        async function fetchNote() {
            try{
                const response = await fetch(`/api/notes/${noteId}`);
                if(!response.ok){
                    throw new Error(`Failed to fetch data from api`)
                }

                const data = await response.json();
                setTitle(data.heading || "");
                setContent(data.content || "");
    
            }catch(error){
                console.log(`error loading note`,error)
                alert(`failed to load note`)
                router.push("/notes/mynotes")
            }finally{
                setIsLoading(false);
            }
        }
        fetchNote();
    },[noteId,router]) 

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!title.trim()){
            alert(`heading is required`)
            return;
        }

        setIsSaving(true);

        try{
            const res = await fetch(`/api/notes/${noteId}`,{
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({heading: title,content:content})
            })
            const result = await res.json()
            if(res.ok){
                alert("Updated succesfully")
                router.push("/notes/mynotes");
            } else {
                alert(`Error: ${result.error || "failed to update"}`);
            }
        }catch(error){
            console.error("error updating")
            alert(`could NOT reach the server`)
        } finally{
            setIsSaving(false);
        }
    }

    if(isLoading){
        return (
            <div>
                <div>
                    Loading notes ....
                </div>
            </div>
        )
   }

   return (
        <>
            <div
                className="flex flex-col items-center justify-start min-h-screen pt-20">
                <h1 className="text-sm uppercase tracking-widest text-gray-400 text-center pb-3">
                    Create the coolest note possible
                </h1>
                <div>
                    <form onSubmit={handleUpdate}>
                        <input type="text" id="heading" name="heading" placeholder="Heading" value={title} onChange={(e) => setTitle(e.target.value)}
                            className="border-none bg-transparent text-5xl font-bold
                            focus:outline-none text-center w-full mb-8"/>

                        <textarea placeholder="WRITE YOUR NOTES HERE 📝" rows={15} value={content} className="bg-transparent border-none focus:outline-none text-xl w-full max-w-6xl px-4 text-center" onChange={(e) => setContent(e.target.value)}>
                        </textarea>

                        <div>
                            <button type="submit" className="border-2 border-white  hover:bg-primary mt-4 p-2 hover:scale-105 transition-all duration-200 transform ">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

    }
