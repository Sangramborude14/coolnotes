"use client"

import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("")
    const router = useRouter();
    


    const handleLogin = async () => {
        const {data,error} = await authClient.signIn.email({
            email,password,
        });

        if (error) {
            alert(error.message);
        }else{
            
            router.push("/")
        }
    };

    
    return(<>
    <div
     className="flex items-center justify-center min-h-screen bg-background">
        <div 
        className="glass p-10 rounded-3xl w-full max-w-md flex flex-col gap-4 shadow-2xl">
            <h2 
            className="mb-4 text-center text-3xl font-bold tracking-wide ">
                Register for DevNotes</h2>
            <label 
            className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                Email</label>
            <input type="text" placeholder="enter your registered email" name="email" onChange={(e) => setEmail(e.target.value)}
            className="p-4 rounded-xl border border-border bgwhite/50 focus:ring-primary focus:ring-2 outline-none transition-all ">
            </input>
            <label 
             className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                Password</label>
            <input type="password" name="password"onChange={(e) => setPassword(e.target.value)} placeholder="u didn't forget it right?" className="p-4 rounded-xl border border-border bgwhite/50 focus:ring-primary focus:ring-2 outline-none transition-all ">
            </input>
           
            <button type="submit" name="signup" onClick={handleLogin} 
            className="mt-4 bg-primary text-white p-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
             Login</button>

             <button type="submit" name="google-login" onClick={() => authClient.signIn.social({provider: "google"})}
                            className="mt-4 bg-primary text-white p-4 rounded-xl font-bold hover:scale-105 transition-all shadow-lg">
              Continue with Google
                </button>
            <p>
                Dont have an account ? <Link href="/signup" className="text-blue-500">SignUp</Link>
            </p>
    </div>
    </div>
    </>)
}