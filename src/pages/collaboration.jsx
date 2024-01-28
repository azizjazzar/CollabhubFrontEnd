
import { Footer, Bienvenu ,Sidebar } from "@/widgets/layout";
import { Cardsgrids} from "@/widgets/cards";

export function Collaboration() {
  return (
    <>
     <section className="relative block h-[20vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section>

      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
       <div className="sticky top-0 bg-white z-10  pb-4">

              <Sidebar/>
        </div> 
        <div className="sticky top-0 bg-white z-10  pb-4">  
           <Bienvenu/>
           <Cardsgrids/>

         </div>
     
      </div>
          


   
   

    </>
  );
}

export default Collaboration;




