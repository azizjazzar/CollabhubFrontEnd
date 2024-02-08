"use client";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Typography } from "@material-tailwind/react";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  FireIcon,
} from "@heroicons/react/24/solid";
import { InfoCard  } from "@/widgets/cards/info-card";

const EDUCATION = [
  {
    icon: BriefcaseIcon,
    title: "Certified Web Developer - Web Development Institute",
    date: "2016",
    children:
      "This comprehensive program covered HTML5, CSS3, JavaScript, responsive design, server-side scripting, and web security.",
  },
  {
    icon: BriefcaseIcon,
    title: "Responsive Web Design Certification - FreeCodeCamp",
    date: "2015",
    children:
      "The Responsive Web Design certification signifies competence in designing and developing websites that adapt seamlessly to various screen sizes and devices.",
  },
  {
    icon: BriefcaseIcon,
    title: "JavaScript Developer Certification - Code Academy",
    date: "2014",
    children:
      "This certification demonstrates advanced proficiency in JavaScript programming, including ES6 features and practical applications.",
  },
  {
    icon: BriefcaseIcon,
    title: "Bachelor of Science in Computer Science - XYZ University",
    date: "2014-2016",
    children:
      "Relevant Coursework: Data Structures, Algorithms, Web Development, Software Engineering, Database Management.",
  },
];

const EXPERIENCE = [
  {
    icon: BriefcaseIcon,
    title: "Freelancer Web Developer",
    date: "2023 - PRESENT",
    children:
      "The core of my work involved actual web development. I would write code, design layouts, and create functionality based on the project's specifications.",
  },
  {
    icon: BriefcaseIcon,
    title: "Technical Team Lead",
    date: "2021 - 2023",
    children:
      "I provided strong leadership by overseeing and guiding a team of highly skilled technical professionals.",
  },
  {
    icon: BriefcaseIcon,
    title: "Senior Web Developer",
    date: "2017 - 2021",
    children:
      "Revamped the automated test framework for web services, resulting in a remarkable 90% reduction in debugging and issue resolution time.",
  },
  {
    icon: BriefcaseIcon,
    title: "Junior Web Developer",
    date: "2015 - 2017",
    children:
      "Developed 10+ responsive websites for clients in a variety of industries.",
  },
];

const SKILLS = [
  {
    icon: FireIcon,
    title: "Front-End Frameworks",
    date: "Technical Skills",
    children:
      "Competent in working with front-end frameworks such as React, Angular, or Vue.js to develop dynamic and responsive web applications with a focus on user experience.",
  },
  {
    icon: FireIcon,
    title: "Attention to Detail",
    date: "Soft Skills",
    children:
      "Meticulous attention to detail in code quality, user interface design, and testing to ensure error-free and user-friendly web applications.",
  },
  {
    icon: FireIcon,
    title: "Responsive Web Design",
    date: "Technical Skills",
    children:
      "Skilled in creating responsive layouts using CSS Grid, Flexbox, and media queries. Ensures websites adapt seamlessly to various screen sizes and devices.",
  },
  {
    icon: FireIcon,
    title: "Time Management",
    date: "Soft Skills",
    children:
      "Excellent time management skills to meet project deadlines, prioritize tasks effectively, and handle multiple projects simultaneously.",
  },
];

export function InformationSection() {
  return (
    <section className="pb-28 px-8">
      <div className="grid xl:grid-cols-2 md:grid-cols-1 container gap-20 mx-auto items-start">
        <div>
          <div className="mb-10">
            <Typography color="blue-gray" className="mb-2 text-3xl font-bold">
                Contributions
            </Typography>
            <Typography variant="lead" className="!text-gray-500">
              See my contributions.
            </Typography>
          </div>
          <div className="container mx-auto grid grid-cols-1 gap-16 gap-y-12">
          
 

          {EDUCATION.map((props, idx) => (
            <Link to="/freelancer_collab" className="group border p-1 rounded-lg cursor-pointer -mb-6 hover:bg-gray-200 hover:text-gray">
              
              <InfoCard key={idx} {...props} />
              </Link>
            ))}


        
       
          </div>
        </div>
        
        <div>
          <div className="mb-10">
            <Typography color="blue-gray" className="mb-2 text-3xl font-bold">
              Projects
            </Typography>
            <Typography variant="lead" className="!text-gray-500">
              See my Projects.
            </Typography>
          </div>
          <div className="container mx-auto grid grid-cols-1 gap-16 gap-y-12">
            {EXPERIENCE.map((props, idx) => (
               <Link to="/projectcollab" className="group border p-1 rounded-lg cursor-pointer -mb-6 hover:bg-gray-200 hover:text-gray">
              <InfoCard key={idx} {...props} />
              </Link>
            ))}
                        

          </div>
        </div>
      </div>
      <div>
        
      </div>

    </section>
  );
}

export default InformationSection;
