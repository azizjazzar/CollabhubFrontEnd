import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';






export function SuggestionComponent() {
  const { subject ,meetingId } = useParams();
  const [suggestion, setsuggestion] = useState('');


  




  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const response = await axios.get(`https://colabhub.onrender.com/meet/display-suggestion/${meetingId}`);
        const data = response.data;
  
        if (!data.suggestion) {
          const geminiResponse = await axios.post('https://colabhub.onrender.com/api/auth/geminiAnalyseWithText', {
            text: "give me suggestion to ask on a meet about " + subject + "do not give me titles ",
          });
          setsuggestion(geminiResponse.data.answer);
        } else {
          setsuggestion(data.suggestion);
        }
      } catch (error) {
        console.error('Error fetching or processing suggestion:', error.message);
      }
    };
  
    fetchSuggestion();
  }, [meetingId, subject]);

  const handleAddSuggestion = async () => {
    try {
      await axios.put(`https://colabhub.onrender.com/meet/fill-suggestion/${meetingId}`, { suggestion });
      console.log('Suggestion filled successfully');
    } catch (error) {
      console.error('Error filling suggestion:', error);
    }
  };
  let phrases = suggestion.split('*');

// Supprimez les éléments vides résultant de la séparation
phrases = phrases.filter(phrase => phrase.trim() !== "");



  return (
    
    <div className="relative mb-6 -mt-40 flex w-full px-4 min-w-0 flex-col break-words bg-gray-200 p-20 mt-10">
      <div className="container mx-auto">
     
      <section>
            <div className="py-16">
                <div className="mx-auto px-6 max-w-6xl text-gray-500">
                    <div className="text-center">
                        <h2 className="text-3xl text-gray-950 dark:text-white font-semibold">Suggestions for your meeting </h2>
                        <p className="mt-6 text-gray-700 dark:text-gray-300">Take notes ! </p>
                    </div>
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {phrases.map((phrase, index) => (
                            <div key={index} className={`relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200 dark:border-red-800 dark:bg-gray-900`}>
                                <div aria-hidden="true" className="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-${phrase.color}-500 to-white dark:from-white dark:to-white blur-2xl opacity-25 dark:opacity-5 dark:group-hover:opacity-10"></div>
                                <div className="relative">
                                  

                                    <div className="mt-6 pb-6 rounded-b-[--card-border-radius]">
                                        <p className="text-gray-700 dark:text-gray-300">{phrase}</p>
                                    </div>

                                
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
   
    
      <button onClick={handleAddSuggestion}>Save Suggestion</button>


      </div>
    </div>
  );
}

export default SuggestionComponent;
