import axios from "axios";

// URL de base de votre serveur
const BASE_URL = "https://colabhub.onrender.com";

class Statistiques {
  async addStatistique(clientAID, clientBID, clientA, clientB, token, channel) {
    try {
        await axios.post(`${BASE_URL}/stats/add`, {
            clientAID,
            clientBID,
            clientA,
            clientB,
            token,
            channel
        });
    } catch (error) {
        console.error("Error adding statistic:", error);
    }
}

async isClientAEmptyInDatabase(token, channel) {
    try {
        // Effectuer une requête à la base de données pour vérifier si le champ clientA est vide
        const response = await axios.post(`${BASE_URL}/stats/check-client-a`, {
            token,
            channel
        });
        return response.data;
    } catch (error) {
        console.error("Error checking if clientA is empty in the database:", error);
        return true; 
    }
}
async getMetting(token, channel) {
  try {
      // Effectuer une requête à la base de données pour vérifier si le champ clientA est vide
      const response = await axios.post(`${BASE_URL}/meeting-token-channel`, {
          token,
          channel
      });
      return response.data;
  } catch (error) {
      console.error("Error checking if clientA is empty in the database:", error);
      return true; 
  }
}


  async getAllStatistiques() {
    try {
      const response = await axios.get(`${BASE_URL}/stats`);
      return response.data;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return [];
    }
  }
  async getAllStatistiquesCounts() {
    try {
      const response = await axios.get(`${BASE_URL}/stats-counts`);
      return response.data;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return [];
    }
  }
  async getTotalTransactionAmount() {
    try {
      const response = await axios.get(`${BASE_URL}/payment/total-transaction-amount`);
      return response.data;
    } catch (error) {
      console.error("Error fetching statistics:", error);
      return [];
    }
  }

  // Méthode pour obtenir une statistique par ID
  async getStatistiqueById(id) {
    try {
      const response = await axios.get(`${BASE_URL}/stats/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching statistic by ID:", error);
      return null;
    }
  }

  // Méthode pour mettre à jour une statistique par ID
  async updateStatistiqueById(id, updatedStatistiqueData) {
    try {
      await axios.put(`${BASE_URL}/stats/${id}`, updatedStatistiqueData);
    } catch (error) {
      console.error("Error updating statistic by ID:", error);
    }
  }

  // Méthode pour supprimer une statistique par ID
  async deleteStatistiqueById(id) {
    try {
      await axios.delete(`${BASE_URL}/stats/${id}`);
    } catch (error) {
      console.error("Error deleting statistic by ID:", error);
    }
  }
  
}

export default Statistiques;
