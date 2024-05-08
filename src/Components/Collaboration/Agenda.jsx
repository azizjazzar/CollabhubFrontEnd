import React, { useState } from 'react';

const AgendaItem = ({ event, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    onDelete(event.id);
  };

  return (
    <div
      className={`border-l-4 border-${event.color}-400 p-4 rounded-lg mb-4 hover:shadow-lg transition duration-300 ease-in-out ${
        expanded ? 'bg-slate-100' : 'bg-white'
      }`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold mb-2">{event.name}</h3>
          <p className="text-slate-600">{event.dateStart+" " + event.dateEnd}</p>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleExpand}
            className="text-slate-500 hover:text-slate-700 focus:outline-none mr-2"
          >
            {expanded ? '-' : '+'}
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
      {expanded && (
        <p className="text-slate-800 mt-2">
          {event.description}
        </p>
      )}
    </div>
  );
};

const Agenda = ({ events, onDelete }) => {
  return (
    <div className="max-w-lg mx-auto">
     {events.length === 0 ? null  : <h2 className="text-2xl font-light mb-4 ">Tasks</h2> }
     
      {events.map(event => (
        <AgendaItem key={event.id} event={event} onDelete={onDelete} />
      ))}
    </div>
    
  );
};

export default Agenda;