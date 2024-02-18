import Calendar from '@/widgets/layout/calendar';
import SocialCollab from '@/widgets/layout/socialCollab';
import React from 'react'
import { Footer, } from "@/index";

export function ProjectCollab(){
  return (

    
     <>
     
     
     <section className="relative block h-[50vh]">
          <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
          <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
      </section><div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-gray-200">
              <div className="container mx-auto">

              <section className="relative bg-white py-16">
                     
                  </section>

                  <section  className="relative bg-white py-16">
                      <SocialCollab/>
                  </section>

                  <section  className="relative bg-white py-16">
                     <Calendar/>
                  </section>
                    
              <section  className="relative bg-white py-16">
                     <Footer/>
             </section>


              </div>
          </div>
          
          
          
          </>


          

 
  )
}

export default ProjectCollab;