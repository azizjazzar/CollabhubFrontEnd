
import { Footer, Bienvenu, InformationSection, Macarousel,Modal } from "@/index";
import { RechercheCollab } from "@/widgets/layout/recherche-collab";
import React, { useState } from 'react';



export function showFooter(model){
  if (!model) return <Footer/>
  else 
  return null;

}




export function Collaboration() {
  const [openModal, setOpenModal] = useState(false);
  const [openRechercheCollab, setopenRechercheCollab] = useState(false);


  return (
    
    <>

        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-gray-200 p-20 mt-10">
          <div className="container mx-auto">
              
                <section className="relative bg-white py-0.2">
                   <Macarousel/>
                </section>

                <section className="relative bg-white py-16">
                   <Bienvenu/>
                </section>
                <section  className="relative bg-white py-16">        
                            <InformationSection/>

                            <div className="flex justify-center content-center ">
                                    <button type="button" className="mx-5 inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]"  onClick={() => setopenRechercheCollab(true)}>
                                      Join a Team
                                      </button>
                                      <RechercheCollab open={openRechercheCollab} onClose={() => setopenRechercheCollab(false)} />
                                      <button type="button" className="modalButton mx-5 inline-block rounded-full bg-neutral-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] transition duration-150 ease-in-out hover:bg-neutral-800 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-neutral-800 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:outline-none focus:ring-0 active:bg-neutral-900 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] dark:bg-neutral-900 dark:shadow-[0_4px_9px_-4px_#030202] dark:hover:bg-neutral-900 dark:hover:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:focus:bg-neutral-900 dark:focus:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)] dark:active:bg-neutral-900 dark:active:shadow-[0_8px_9px_-4px_rgba(3,2,2,0.3),0_4px_18px_0_rgba(3,2,2,0.2)]" onClick={() => setOpenModal(true)}>
                                      Add a Project
                                      </button>
                                      <Modal open={openModal} onClose={() => setOpenModal(false)} />
                           </div>

                </section>  

              
                       
           <showFooter openModal/>
           <showFooter RechercheCollab/>

                    { (!openModal && !openRechercheCollab) ? <Footer/> : null}   
         
         


           
               
                 
                
           </div>
          </div>
  

         
 

   
  
 
   
    </>
   
  );
}

export default Collaboration;




