import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';

const SimpleForm = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const navigateToServicesPage = () => {
    window.location.href = '/buyProject'; // Redirige vers la page des services
  };

  const navigateToBlogsPage = () => {
    window.location.href = '/blog'; // Redirige vers la page des blogs
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleEnd = () => {
    if (selectedOption === 'services') {
      navigateToServicesPage();
    } else if (selectedOption === 'blogs') {
      navigateToBlogsPage();
    }
  };



  return (
    <ChatBot
    style={{ position: 'fixed', top: '7rem', right: '1rem' }}  // Ajustez les valeurs en fonction de vos préférences
    headerTitle="CollabHub ChatBot" // Change the name here
    userAvatar="/img/user1.jpg"
    
    
    // ...
      steps={[
        {
          id: '1',
          message: 'Bonjour! Que souhaitez-vous faire sur la plateforme CollabHub?',
          trigger: 'options',
        },
        {
          id: 'options',
          options: [
            { value: 'services', label: 'Explorer les services', trigger: 'servicesQuestions' },
            { value: 'blogs', label: 'Lire des blogs', trigger: 'blogsQuestions' },
            { value: 'consultations', label: 'Prendre des consultations avec des experts', trigger: 'consultations' },
            { value: 'projects', label: 'Collaborer sur des projets', trigger: 'projects' },
          ],
        },
        // Questions spécifiques aux services
        {
          id: 'servicesQuestions',
          message: 'Quelle question avez-vous sur les services?',
          trigger: 'servicesOptions',
          delay: 100, // Attente courte pour éviter la répétition
        },
        {
          id: 'servicesOptions',
          options: [
            { value: 'comment-reserver', label: 'Comment réserver un service ?', trigger: 'reservationProcess' },
            { value: 'consulter-services', label: 'Consulter les services disponibles', trigger: 'navigateToServices' },
            { value: 'retour-menu', label: 'Retourner au menu principal', trigger: 'options' },
          ],
        },
        // Questions spécifiques aux blogs
        {
          id: 'blogsQuestions',
          message: 'Quelle question avez-vous sur les blogs?',
          trigger: 'blogsOptions',
          delay: 100, // Attente courte pour éviter la répétition
        },
        {
          id: 'blogsOptions',
          options: [
            { value: 'comment-lire', label: 'Comment lire des blogs ?', trigger: 'readProcess' },
            { value: 'consulter-blogs', label: 'Consulter les blogs disponibles', trigger: 'navigateToBlogs' },
            { value: 'retour-menu', label: 'Retourner au menu principal', trigger: 'options' },
          ],
        },
        // Questions spécifiques aux consultations
        {
          id: 'consultations',
          message: 'Vous cherchez des consultations avec des experts. Voici comment vous pouvez accéder aux consultations...',
          end: true,
        },
        // Questions spécifiques aux projets
        {
          id: 'projects',
          message: 'Vous cherchez à collaborer sur des projets. Voici comment vous pouvez commencer à collaborer sur des projets...',
          end: true,
        },
        // Réponses aux questions sur les services
        {
          id: 'reservationProcess',
          message: 'Pour réserver un service, vous pouvez suivre ces étapes : [étapes de réservation]',
          end: true,
        },
        // Réponses aux questions sur les blogs
        {
          id: 'readProcess',
          message: 'Pour lire un blog, il vous suffit de cliquer sur le lien du blog et commencer à lire.',
          end: true,
        },
        // Redirection vers la page des services
        {
          id: 'navigateToServices',
          message: 'Redirection vers la page des services...',
          trigger: () => {
            navigateToServicesPage();
            return 'end';
          },
        },
        // Redirection vers la page des blogs
        {
          id: 'navigateToBlogs',
          message: 'Redirection vers la page des blogs...',
          trigger: () => {
            navigateToBlogsPage();
            return 'end';
          },
        },
      ]}
      handleEnd={handleEnd}
      handleOptionSelect={handleOptionSelect}
    />
  );
};

export default SimpleForm;
