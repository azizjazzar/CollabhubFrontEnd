import React, { useState } from 'react';
import axios from 'axios';

const Gemini = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBardResponse = async () => {
    setIsLoading(true);
    try {
      // Notez que nous utilisons ici un chemin relatif
      const response = await axios.post('/app/a98850291bf8c780', {
        params: {
          // Assurez-vous que ces paramètres correspondent à ce que votre API attend
          apiKey: 'VOTRE_CLÉ_API',
          data: inputData,
        },
      });
      setResponse(response.data);
    } catch (error) {
      console.error('Erreur lors de l’appel à BARD:', error);
      setResponse('Erreur lors de la récupération des données');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBardResponse();
  };

  return (
    <div className='pt-44'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>Envoyer</button>
      </form>
      {isLoading ? <p>Chargement...</p> : <p>Réponse: {response}</p>}
    </div>
  );
};

export default Gemini;
