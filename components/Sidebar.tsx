"use client"

import { PlusCircle, FileText,Globe, Settings,LogOut } from "lucide-react";
import { authClient } from "@/lib/auth-client";


export default function Sidebar() {
    return (
        <>
        <div className="p-8 font-bold text-2xl tracking-tighter text-primary">
            DevNotes
          </div>
           <nav className="flex-1 px-4 py-2 flex flex-col gap-1">

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600  duration-200 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer group">
            <PlusCircle size={20} className="group-hover:scale-110 transition-transform"/>
            <span className="font-medium"> Create Note</span>
            </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer group">
          <FileText size={20} className="group-hover:scale-110 transition-transform"/>
          <span className="font-medium">My Notes</span>  
          </div>
          
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600  duration-200 hover:bg-primary/10 hover:text-primary transition-all  cursor-pointer group">
          <Globe size={20} className="group-hover:scale-110 transition-transform"/>
          <span className="font-medium">Public Notes</span>
          </div>

          <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600  duration-200 hover:bg-primary/10 hover:text-primary transition-all cursor-pointer group">
          <Settings size={20} className="group-hover:scale-110 transition-transform"/>
          <span className="font-medium">Settings</span>
          </div>

        </nav>
        <div>
          <button onClick={async () => {
            await authClient.signOut();
            window.location.href = "/login";
          }} className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium group">
            <LogOut size={30} className="group-hover:-translate-x-1 transition-transform"/>
            <span>Logout</span>
          </button>
        </div>
        </>
    )
}