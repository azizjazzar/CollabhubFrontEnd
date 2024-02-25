import axios from 'axios';

class AuthenticationService {
  
    async updateUserPicture(email, formData) {
        try {
          await axios.put(`https://colabhub.onrender.com/api/auth/updatePicture/${email}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
      async update(email, updateData) {
        try {
          const updatedUser = await axios.put(`https://colabhub.onrender.com/api/auth/update/${email}`, updateData);
          if (!updatedUser.data.success) {
            throw new Error(updatedUser.data.message || 'User not found by email');
          }
          return updatedUser.data.success;
        } catch (error) {
          console.error('Error updating user:', error);
          throw error;
        }
      }

   async login(userLogin, setAuthUserData, setError, navigate) {
    try {
      const apiUrl = 'https://colabhub.onrender.com/api/auth/login';
      const apiUrlUser = `https://colabhub.onrender.com/api/auth/user/${userLogin.email}`;
      const apiPayload = {
        email: userLogin.email,
        password: userLogin.password,
      };

      const response = await axios.post(apiUrl, apiPayload);

      if (response.data.success) {
        const response2 = await axios.get(apiUrlUser);

        setAuthUserData({
          user: response2.data,
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
        if (response2.data.type === "Utilisateur")
        navigate('/welcome');
      else 
      navigate('/');

      } else {
        alert('Email or Password incorrect!');
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  }

  async getUserById (userId) {
    try {
      const response = await axios.get(`https://colabhub.onrender.com/api/auth/userid/${userId}`);
      if (response.data.success) {
        return response.data.info;
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      throw new Error('Failed to fetch user data. Please try again.');
    }
  };

   async  getUserbyEmail(email)  {
    try {
      const apiUrl = `https://colabhub.onrender.com/api/auth/user/${email}`;
      const response = await axios.get(apiUrl);

      if (response.data.success === false) {
        console.log("Aucun utilisateur trouvé");
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Erreur lors de la requête API:', error);
    }
  };


  async register(user, selectedCountry, navigate) {
    try {
        const apiUrl = 'https://colabhub.onrender.com/api/auth/register';
        const apiPayload = {
          nom: user.FirstName,
          prenom: user.LastName,
          email: user.Email,
          adresse: selectedCountry.label,
          mot_passe: user.ConfirmPassword,
          type: user.Type,
          picture:"team-1.jpg"
        };
        const response = await axios.post(apiUrl, apiPayload);
        alert('Inscription réussie !');
        console.log('API Response:', response.data);
        navigate("/sign-in")

      } catch (error) {
        console.error('Error during API request:', error);
      }
  }
  
}

export default AuthenticationService;
