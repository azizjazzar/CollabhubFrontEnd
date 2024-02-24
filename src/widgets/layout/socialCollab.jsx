import { InfoCard} from "@/widgets/cards/InfoCard";
import response from "@/data/team-data";
import React, { useState } from 'react';
import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    Avatar,
    Badge,
    Pagination,
  } from '@windmill/react-ui'
  






 
export function SocialCollab  () {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])

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

    // pagination setup
    const resultsPerPage = 10
    const totalResults = response.length


    // pagination change control
    function onPageChange(p) {
      setPage(p)
    }
  
    // on page change, load new sliced data
    // here you would make another server request for new data

  
  return (
            <>
                        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                        <InfoCard title="Total contributors" value="6">
                         {/*
                        <RoundIcon
                            icon={"/img/peaple.svg"}
                            iconColorClass="text-orange-500 dark:text-orange-100"
                            bgColorClass="bg-orange-100 dark:bg-orange-500"
                            className="mr-4"
                        />
                        
  */} 
                        </InfoCard>

                        <InfoCard title="Expenses per day" value="$ 6,760">

                             {/*
                        <RoundIcon
                            icon={"/img/money.svg"}
                            iconColorClass="text-green-500 dark:text-green-100"
                            bgColorClass="bg-green-100 dark:bg-green-500"
                            className="mr-4"
/>*/}
                        </InfoCard>

                        <InfoCard title="Start" value="08/01/2024">
                             {/*
                        <RoundIcon
                            icon={"/img/cart.svg"}
                            iconColorClass="text-blue-500 dark:text-blue-100"
                            bgColorClass="bg-blue-100 dark:bg-blue-500"
                            className="mr-4"
/>*/}
                        </InfoCard>

                        <InfoCard title="End" value="08/03/2024">
                             {/*
                        <RoundIcon
                            icon={'/img/chat.svg'}
                            iconColorClass="text-teal-500 dark:text-teal-100"
                            bgColorClass="bg-teal-100 dark:bg-teal-500"
                            className="mr-4"
/>*/}
                        </InfoCard>
                    </div>

                    <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
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
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
   <div className="relative flex flex-col items-center justify-center">
                  <button className="bg-green-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    Add Contributor
                  </button>
        </div>
        </TableFooter>
     
      </TableContainer>


              
            
            </>
  )
}

export default SocialCollab