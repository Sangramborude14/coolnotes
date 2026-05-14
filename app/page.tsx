import BarCard from "@/components/barCard";

export default function Home() {
  return (
   <>
   <div className="space-y-10">
    <header>
    <h1>DevNotes</h1>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card heading={"Total Notes"} counter={"122"}/>
      <Card heading={"Weekly Study Time"} counter={"12.5h"}/>
      <BarCard note1={11} note2={12} note3={22}/>
      
    </div>
   </div>
   </>
  );
}
function Card({ heading, counter }: { heading: string; counter: string }){
  return(
    <>
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
    <h1>{heading}</h1>
    <div>
      <span className="">{counter}</span>
    </div>
    </div>
    </>
  )
}
