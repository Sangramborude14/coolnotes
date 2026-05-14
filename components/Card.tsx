export default function Card({ heading, counter }: { heading: string; counter: string }){
  return(
    <>
    <div className="bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6 grid grid-cols-1 place-items-center ">
    <h1 className="text-3xl pb-0">{heading}</h1>
    <div>
      <span className="text-red-300 font-bold text-8xl p ">{counter}</span>
    </div>
    </div>
    </>
  )
}