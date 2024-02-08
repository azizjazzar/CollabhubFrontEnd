import React from 'react';
import imagecollab from '/img/recherchecollab.jpg';
import {
  Card,
  Typography,
} from "@material-tailwind/react";
import {
  Table,
  TableCell,
  TableRow,
  Avatar,
  Badge,
} from '@windmill/react-ui'




const Data = [
  {
    img: "/img/team-1.jpg",
    name: "Ryan Tompson",
    position: "Web Developer",
    socials: [
      {
        color: "light-blue",
        name: "twitter",
      },
      {
        color: "blue",
        name: "linkedin",
      },
      {
        color: "pink",
        name: "dribbble",
      },
    ],
  },
  {
    img: "/img/team-2.jpg",
    name: "Romina Hadid",
    position: "Marketing Specialist",
    socials: [
      {
        color: "light-blue",
        name: "twitter",
      },
      {
        color: "blue",
        name: "linkedin",
      },
      {
        color: "pink",
        name: "dribbble",
      },
    ],
  },
  {
    img: "/img/team-3.jpg",
    name: "Alexa Smith",
    position: "UI/UX Designer",
    socials: [
      {
        color: "light-blue",
        name: "twitter",
      },
      {
        color: "blue",
        name: "linkedin",
      },
      {
        color: "pink",
        name: "dribbble",
      },
    ],
  },
  {
    img: "/img/team-4.png",
    name: "Jenna Kardi",
    position: "Founder and CEO",
    socials: [
      {
        color: "light-blue",
        name: "twitter",
      },
      {
        color: "blue",
        name: "facebook",
      },
      {
        color: "pink",
        name: "dribbble",
      },
    ],
  },
]




export function RechercheCollab({ open, onClose }) {
  if (!open) return null;

  return (
    <div onClick={onClose} className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className='max-w-2xl w-full bg-white rounded-lg shadow-md flex'
      >
        <img src={imagecollab} alt='/' style={{ width: '250px', objectFit: 'cover', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }} />
        <div className='flex flex-col p-4'>
        <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Find Collaboration
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to see you! Enter the name of the Projct.
      </Typography>
     

      <form className='mt-5'>   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search new Collaborations" required/>
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
<Table>
            {Data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.img} alt="User image" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.position}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </Table>



    </Card>
       
        </div>
      </div>
    </div>
  );
}

export default RechercheCollab;
