import BarCard from "@/components/barCard";
import Card from "@/components/Card";
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

