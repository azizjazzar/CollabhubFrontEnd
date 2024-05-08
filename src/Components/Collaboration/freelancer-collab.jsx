
import React, { useState, useEffect } from 'react';
import { Footer } from '../..';
import { useParams } from 'react-router-dom';
import ProjectOwnerCollab from './projectownercollab';
import FormulaireTask from "@/widgets/layout/formulaireTask";
import { useAuth } from "@/pages/authContext";
import { Select } from '@mui/material';
import AddFreelancer from './addFreelancer';
import {
 
  Typography,
} from "@material-tailwind/react"

export function FreelancerCollab() {


  const { projectId ,userId } = useParams();
  const [Tasks, setTasks] = useState([]);
  const [Freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    fetch(`https://colabhub.onrender.com/tasks/project/${projectId}`)
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error fetching tasks by project  details:", error));
      
  }, [projectId]);

  useEffect(() => {
    fetch(`https://colabhub.onrender.com/jobs/getFreelancersByJob/${projectId}`)
      .then(response => response.json())
      .then(data => setFreelancers(data))
      .catch(error => console.error("Error fetching tasks by project  details:", error));
  }, [projectId]);







  const getFormattedTime = (dateString) => {
    const dateObject = new Date(dateString);
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    
    <>
 
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-3.png')] bg-cover bg-center scale-105" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
   
      </section>

        <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-gray-200">
          <div className="container mx-auto">
              
              

          <section className="relative bg-white py-16 flex flex-col items-center justify-center">
        
          <div className="text-center mt-15">
                <div className="floating"> 
                  <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white">
                  Regain <span className="px-2 text-white bg-blue-600 rounded dark:bg-blue-500">control</span> over your days
                  </h1>
                  <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                    Whether you need guidance, feedback, or hands-on support, our collaborative community is here to help you succeed!
                  </p>
                </div>
          </div>

          </section>

   




                <section className="relative bg-white py-16">
                <Typography className="mb-4 text-center text-2xl font-bold text-gray-600">
                      Meetings
                    </Typography>

             
              <ProjectOwnerCollab userId={userId} freelancers={Freelancers} projectId={projectId}/>
                </section>

                <section className="relative bg-white py-16">
                <Typography className="mb-4 text-center text-2xl font-semibold text-gray-600">
                  My Team
                </Typography>
  

                            
                       <Collabolaratuers freelancers={Freelancers} tasks ={Tasks} projectId={projectId}/>   
                       
                    

                </section>
                

                <section className="relative bg-white py-20">

                  <Footer/>
              
                </section>

                

       
              


           
               
                 
                
           </div>
          </div>
  

         
 

   
  
 
   
    </>
   
  );
}

function Collabolaratuers(props){
 const  projectId=props.projectId;
  const [openModalTask, setOpenModalTask] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Fonction pour ouvrir le modal
  const handleClick = () => {
    Selected === 1 ? setOpenModalTask(true) : Selected === 0  ? setShowModal(true)   : null
   
   
 };
    

    const [Selected, setSelected] = useState(0);
    const freelancers = props.freelancers;
    const tasks = props.tasks;
    const [Project, setProject] = useState([]);
  const { authData, setAuthUserData } = useAuth();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4  ;
    // Calculer le nombre total de pages
    const calculTotalPages=() => { return Selected === 0 ? Math.ceil(freelancers.length / itemsPerPage) : Selected === 1  ? Math.ceil(tasks.length / itemsPerPage) : 0};
   const totalPages = calculTotalPages();
    // Calculer l'index de début et de fin pour les éléments à afficher sur la page actuelle
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const num = navigationNumbers(totalPages); 

    useEffect(() => {
      fetch(`https://colabhub.onrender.com/jobs/get/${projectId}`)
        .then(response => response.json())
        .then(data => setProject(data))
        .catch(error => console.error("Error fetching  project :", error));
    }, [projectId]);

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };

    function HandleSelected(index){
        return index === 0   ?  setSelected(0)  : index === 1  ?  setSelected(1) : setSelected(2)
  
        
    }
    function NavSelection(index )
    {
        return Selected === index ? "border-purple-500 text-purple-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
     
    }
    return (
       
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
       
         
         
   
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
              <AddFreelancer  open={showModal} handleOpen ={ () => setShowModal(!showModal)}  projectId={projectId} />
            
              <nav className="mt-2 -mb-px flex justify-center space-x-8" aria-label="Tabs">
                  
                    <button onClick={() => HandleSelected(0)} className={NavSelection(0)}   style={{ color: 'black' }}
 >
                    Collaborators 
                      
                        <span className= {  Selected === 0 ?   "bg-gray-100 text-orange-50-600 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block" : "bg-gray-100 text-gray-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block" } x-state:on="Current" x-state:off="Default" x-state-description="Current: &quot;bg-purple-100 text-purple-600&quot;, Default: &quot;bg-gray-100 text-gray-900&quot;">{freelancers.length}</span>
                      </button>
                  
                    <button  onClick={() => HandleSelected(1)} className={NavSelection(1)}  style={{ color: 'black' }} >
                      Tasks
                      
                        <span className= {  Selected === 1 ?   "bg-gray-100 text-orange-50-600 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block" : "bg-gray-100 text-gray-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block" } x-state:on="Current" x-state:off="Default" x-state-description="Current: &quot;bg-purple-100 text-purple-600&quot;, Default: &quot;bg-gray-100 text-gray-900&quot;">{tasks.length}</span>
                      </button>
                    
                 {/*
                     <button onClick={() => HandleSelected(2)} className={NavSelection(2)}>
                      Chat
                      
                        <span  className= {  Selected === 2 ?   "bg-purple-100 text-purple-600 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block" : "bg-gray-100 text-gray-900 hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block" } 
                       x-state-description="undefined: &quot;bg-purple-100 text-purple-600&quot;, undefined: &quot;bg-gray-100 text-gray-900&quot;">6</span>
                      </button>
                  */ } 
                  
                </nav>

              </div>
            </div>
          </div>



          <ul role="list" className="mt-5 divide-y divide-gray-200 border-t border-gray-200 sm:mt-0 sm:border-t-0">
              {Selected === 0 ? <Freelancers freelancers={freelancers} start={startIndex} end={endIndex}/> : Selected === 1 ? <Todo tasks={tasks} start={startIndex} end={endIndex}/>  : console.log("page non disponible")}

          </ul>
          <div className="flex items-center justify-center mb-5 mt-5">
            {Project.ownerId === authData.user._id ?  <button onClick={()=>{handleClick()}}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                type="button"
              >
{Selected === 0 ? <span>Add New Member to this Project</span> : <span>Add New Task</span>}
        </button> : null}
          
        <div className={openModalTask ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' : 'hidden'}>
        <FormulaireTask open={openModalTask} onClose={() => setOpenModalTask(false)} projectid={projectId}/>
      </div>
        
          </div>
        

          {/** menu de la navigation  */}


          <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0" aria-label="Pagination">
            <div className="-mt-px flex w-0 flex-1">
              <button  onClick={()=> {(1 < currentPage  ? handlePageChange(currentPage -1) : null )}} className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700">
                <svg className="mr-3 h-5 w-5 text-gray-400" x-description="Heroicon name: mini/arrow-long-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clip-rule="evenodd"></path>
  </svg>
                Previous
              </button>
            </div>
         
            {num.map((number, index) => (
                      <div className="hidden md:-mt-px md:flex" key={index}>
                                      <button  onClick={()=>handlePageChange(number)} className={currentPage === number  ? "inline-flex items-center border-t-2 border-purple-500 px-4 pt-4 text-sm font-medium text-purple-600" : "inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700" } aria-current="page">
                                        {number}
                                      </button>
                                     
                       </div>
    ))}
       
       
            <div className="-mt-px flex w-0 flex-1 justify-end">
              <button onClick={()=> {(totalPages > currentPage  ? handlePageChange(currentPage +1) : null )}} className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-200 hover:text-gray-700">
                Next
                <svg className="ml-3 h-5 w-5 text-gray-400" x-description="Heroicon name: mini/arrow-long-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clip-rule="evenodd"></path>
  </svg>
              </button>
            </div>
         


           
          </nav>
        
        

        </div>
      
    )
}

function Todo(props){
  const tasks = props.tasks;
  const start=props.start;
  const end=props.end;

   // Extraire les éléments à afficher sur la page actuelle
   const currentItems = tasks.slice(start, end);
    return (
 
      currentItems.map((task , index )=>(

      <li key={index}>
      <div className="px-4 py-5 sm:px-6">
        <div className="flex items-center justify-between">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{task.name}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">{task.description}</p>
        </div>
        <div className="mt-4 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500">Status: <span className="text-green-600">Active</span></p>
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Edit</a>
        </div>
      </div>
      </li>

    )  ) )
  }

  function Freelancers(props)
  {
    const freelancers = Array.isArray(props.freelancers) ? props.freelancers : [];
    const start = props.start;
    const end = props.end;
    const [users, setUsers] = useState({});
    const getFreelancer = (id) => { 
      authenticationService.getUserById(id)
              .then(userData => {
                setUsers(prevUsers => ({
                  ...prevUsers,
                  [id]: userData
                }));
              })
              .catch(console.error);

    }
   

      // Extraire les éléments à afficher sur la page actuelle
      const currentItems =freelancers.slice(start,end);
    return (
      currentItems.map((freelancer, index)=>(
        <li key={index}>
        <a href="#" className="group block">
          <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
            <div className="flex min-w-0 flex-1 items-center">
              <div className="flex-shrink-0">
                <img className="h-12 w-12 rounded-full group-hover:opacity-75" src={`https://colabhub.onrender.com/images/${freelancer?.picture}`} alt=""/>
              </div>
             

              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                <div>
                  <p className="truncate text-sm font-medium text-purple-600">{freelancer.name}</p>
                  <p className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" x-description="Heroicon name: mini/envelope" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
<path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"></path>
<path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"></path>
</svg>
                    <span className="truncate">{freelancer.email}</span>
                  </p>
                </div>
                <div className="hidden md:block">
                  <div>
                    <p className="text-sm text-gray-900">
                      Type
              
                      <p className="text-sm text-gray-500">{freelancer.type}</p> 
                    </p>
                    <p className="mt-2 flex items-center text-sm text-gray-500">
                      <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-green-400" x-description="Heroicon name: mini/check-circle" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd"></path>
</svg>
                      {freelancer.telephone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <svg className="h-5 w-5 text-gray-400 group-hover:text-gray-700" x-description="Heroicon name: mini/chevron-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
<path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd"></path>
</svg>
            </div>
          </div>
        </a>
      </li>  

      ))
    

    )  

  }




{/* 

function Pagination({ items, itemsPerPage }) {


  // Fonction pour changer de page
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      
      <ul>
        {currentItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

   
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Précédent
        </button>
        <span> Page {currentPage} sur {totalPages} </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Suivant
        </button>
      </div>
    </div>
  );
};

*/}


const navigationNumbers = (totalPages) =>{
  let navigationElements = []; 
  for(let i=1 ; i<=totalPages ; i ++ ){
    navigationElements.push(i);


  }
  
  return navigationElements;
}


export default FreelancerCollab;




