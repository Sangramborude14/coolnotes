interface StuduHours {
    note1: number;
    note2: number;
    note3: number;
}


export default function BarCard({note1,note2,note3}:StuduHours){
    const maxHours = Math.max(note1,note2,note3,1);
    const getHeight = (hours: number) => (hours/maxHours) * 100
  
  return(
    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl w-80">
      <h1 className="text-white text-xl font-bold mb-6">Best Picks</h1>
      <div className="flex items-end justify-around h-40 gap-4 border-b border-white/20 pb-2">
         <Bar label="Note A" value={note1} height = {getHeight(note1) } color="bg-blue-500"/>
         <Bar label="Note B" value={note2} height = {getHeight(note2)} color="bg-green-500"/>
         <Bar label="Note C" value={note3} height = {getHeight(note3)} color="bg-red-500"/>
      </div>
    </div>
  )
}

function Bar({label,value,height,color}:{label: string,value: number,height: number,color: string}){
return(<>
<div className="flex flex-col items-center flex-1 h-full">
<div className="relative w-full flex flex-col justify-end h-full">

    <div className={`${color} w-full rounded-t-lg transition-all duration-700 ease-out shadow-lg`}
    style={{height: `${height}%`}}>
    
    <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-xs text-white font-bold">{value}h</span>
        
    </div>

</div>
<span className="text-[10px] text-gray-400 mt-3 uppercase tracking-wider">{label}</span>
</div>
</>)
}