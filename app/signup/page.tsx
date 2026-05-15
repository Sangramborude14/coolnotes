"use client"

import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const [name,setName] = useState("")
    const router = useRouter()

    const handleSignUp = async () => {
        const {data,error} = await authClient.signUp.email({
            email,password,name,
        });

        if (error) {
            alert(error.message);
        }else{
            console.log(`success`,data)
            router.push("/")

        }
    };

    return(<>
    <div
     className="flex items-center justify-center min-h-screen bg-background">
        <div 
        className="glass p-10 rounded-3xl w-full max-w-md flex flex-col gap-4 shadow-2xl">
            <h2 className="mb-4 text-center text-3xl font-bold tracking-wide ">Register for DevNotes</h2>
            <label 
            className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
            <input type="text" placeholder="keep it unique" name="email" onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-xl border border-border bgwhite/50 focus:ring-primary focus:ring-2 outline-none transition-all "></input>
            <label 
             className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Password</label>
            <input type="password" name="password"onChange={(e) => setPassword(e.target.value)} placeholder="keep it safe 🗝️" className="p-4 rounded-xl border border-border bgwhite/50 focus:ring-primary focus:ring-2 outline-none transition-all "></input>
            <label 
             className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Name</label>
            <input type="name" name="name" placeholder="Your Name" onChange={(e) => setName(e.target.value)}  className="p-4 rounded-xl border border-border bgwhite/50 focus:ring-primary focus:ring-2 outline-none transition-all "></input>
            <button type="submit" name="signup" onClick={handleSignUp} 
            className="mt-4 bg-primary text-white p-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">SignUp</button>
            <p>
                Already have an account ? <Link href="/login"className="text-blue-500">Login</Link>
            </p>
    </div>
    </div>
    </>)
}