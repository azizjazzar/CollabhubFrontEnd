import { Menu, Transition } from '@headlessui/react';
import { PiDotsThreeVerticalLight } from "react-icons/pi";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { FormulaireMeet } from "@/widgets/layout/formulaireMeet";
import { useAuth } from '@/pages/authContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns';
import { Fragment, useState , useEffect} from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export function ProjectOwnerCollab(props) {
  const userId = props.userId;
  const freelancers = props.freelancers;
  const projectId = props.projectId;
  const [meetings, setMeetings] = useState([]);

  useEffect(() => {
    fetch(`https://colabhub.onrender.com/meet/meetings/jobOffer/${projectId}`)
      .then(response => response.json())
      .then(data => setMeetings(data.meetings))
      .catch(error => console.error("Error fetching meets:", error));
      
  }, [meetings]);


  let today = startOfToday();
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  let selectedDayMeetings = [];
  if (Array.isArray(meetings)) {
    selectedDayMeetings = meetings.filter((meeting) =>
      isSameDay(parseISO(meeting.dateStart), selectedDay)
    );
  }

  // Fonction pour ouvrir le modal
  const handleClick = () => {
    setOpenModalmeet(true);
  };

  const [OpenModalmeet, setOpenModalmeet] = useState(false);

  return (
    <div className="pt-16">
      <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
        <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
        <div className={OpenModalmeet ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' : 'hidden'}>

<FormulaireMeet open={OpenModalmeet} onClose={() => setOpenModalmeet(false)} userId={userId} freelancers={freelancers} pId={projectId} />

</div>
          <div className="md:pr-14">
            <div className="flex items-center">
              <h2 className="flex-auto font-semibold text-gray-900">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </h2>
              <button
                type="button"
                onClick={previousMonth}
                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <SlArrowLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                onClick={nextMonth}
                type="button"
                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <SlArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
              <div>S</div>
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
              {days.map((day, dayIdx) => (
                <div
                  key={day.toString()}
                  className={classNames(
                    dayIdx === 0 && colStartClasses[getDay(day)],
                    'py-1.5'
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={classNames(
                      isEqual(day, selectedDay) && 'text-white',
                      !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                      !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                      isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                      isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                      !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                      (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                      'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                    )}
                  >
                    <time dateTime={format(day, 'yyyy-MM-dd')}>
                      {format(day, 'd')}
                    </time>
                  </button>

                  <div className="w-1 h-1 mx-auto mt-1">
                  {meetings && Array.isArray(meetings) && meetings.some((meeting) =>
                          isSameDay(parseISO(meeting.dateStart), day)
                        ) && (
                                <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                              )}

                  </div>
                </div>
              ))}
            </div>
          </div>
          <section className="mt-12 md:mt-0 md:pl-14">
            <h2 className="font-semibold text-gray-900">
              Schedule for{' '}
              <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                {format(selectedDay, 'MMM dd, yyy')}
              </time>
            </h2>
            <ol className="mt-4 space-y-10 text-sm leading-6 text-gray-500">
              {selectedDayMeetings.length > 0 ? (
                selectedDayMeetings.map((meeting) => (
                  <Meeting meeting={meeting} key={meeting._id} />
                ))
              ) : (
                <p>No meetings for today.</p>
              )}

              <button
                onClick={handleClick}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                type="button"
              >
                Add metting now 
              </button>
            </ol>
          </section>

        </div>
      </div>
    </div>
  );
}

function Meeting({ meeting }) {
  async function supprimerRessource(id) {
    try {
      const response = await axios.delete(`https://colabhub.onrender.com/meet/delete/${id}`);
      if (response.status !== 200) {
        throw new Error('La requête de suppression a échoué.');
      }
      const data = response.data;
      console.log('Ressource supprimée avec succès :', data);
      return data;
    } catch (error) {
      console.error('Erreur lors de la suppression de la ressource :', error);
      throw error;
    }
  }

  let startDateTime = parseISO(meeting.dateStart);
  let endDateTime = parseISO(meeting.dateEnd);

  const { authData, setAuthUserData } = useAuth();

  return (
    <Link to={`/meeting/${meeting._id}`} className="group border p-1 rounded-lg cursor-pointer -mb-6 hover:bg-gray-200 hover:text-gray">
      <li className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
        <img
          src={`https://colabhub.onrender.com/images/${authData.user?.picture}`}
          alt=""
          className="flex-none w-10 h-10 rounded-full"
        />
        <div className="flex-auto">
          <p className="text-gray-900">{meeting.name}</p>
          <p className="mt-0.5">
            <time dateTime={meeting.dateStart}>
              {format(startDateTime, 'h:mm a')}
            </time>{' '}
            -{' '}
            <time dateTime={meeting.dateEnd}>
              {format(endDateTime, 'h:mm a')}
            </time>
          </p>
        </div>
        <Menu
          as="div"
          className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
        >
          <div>
            <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
              <span className="sr-only">Open options</span>
              <PiDotsThreeVerticalLight className="w-6 h-6" aria-hidden="true" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link to={`/suggestion/${meeting.name}/${meeting._id}`}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Suggestions
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={(e) => {
                        e.preventDefault(); // Empêche le comportement par défaut du lien
                        supprimerRessource(meeting._id); // Appelle la fonction de suppression
                      }}
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </li>
    </Link>
  );
}

let colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

export default ProjectOwnerCollab;
