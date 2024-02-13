import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

const posts = [
  {
    id: 1,
    author: 'John Doe',
    authorImage: '/img/team-1.jpg',
    date: '13 Février 2024',
    title: 'En restructuration, Cisco pourrait licencier des milliers d employés',
    description: 'Selon l agence Reuters, la possibilité d un plan de réorganisation découlant sur plusieurs milliers de postes supprimés serait étudiée chez Cisco. Une annonce pourrait avoir lieu le 14 février alors que l équipementier se prépare à publier ses résultats financiers du deuxième trimestre de l exercice 2024.',
    category: 'Actualités'
  },
  {
    id: 2,
    author: 'Jane Smith',
    authorImage: '/img/team-2.jpg',
    date: '14 Février 2024',
    title: 'Pour sécuriser l IA, les Etats-Unis créent un consortium',
    description: "Si l’UE a pour habitude de réglementer (cf la récente approbation de l’IA Act), les Etats-Unis préfèrent laisser le marché se réguler. Et c’est bien ce qui prévaut dans la création de l’AI Safety Institute Consortium (AISIC). Cette structure, soutenue par le gouvernement américain, sera chargée de mettre en place des garde-fous pour l'utilisation et le développement de l'IA. Annoncé en fin de semaine dernière par le Département du Commerce, le consortium fait partie du NIST (National Institute of Standards and Technology et comprend plus de 200 entreprises et organismes. Parmi ses membres figurent Amazon.com, l'université Carnegie Mellon, l'université Duke, la Free Software Foundation et Visa, de même que plusieurs grands développeurs d'outils d'IA, dont Apple, Google, Microsoft et OpenAI.",
    category: 'Technologie'
  },
  {
    id: 3,
    author: 'Jane Smith',
    authorImage: '/img/team-3.jpg',
    date: '14 Février 2024',
    title: "F5 Networks s'attaque à la sécurité des API ",
    description: "L’équipementier F5 renforce la sécurité des applications en ajoutant un service à son package principal Distributed Cloud Service. Lancé en 2023, ce dernier est une plateforme SaaS permettant la gestion des applications, la gestion de l'infrastructure et les services de sécurité sur les sites cloud publics, cloud privés et edge des clients. ",
    category: 'Sécurité informatique'
  },
  {
    id: 4,
    author: 'Jane Smith',
    authorImage: '/img/team-1.jpg',
    date: '14 Février 2024',
    title: "Rimage rebondit de l'archivage optique au data management ",
    description: "Sophia peut toutefois travailler avec tous les types de stockage, local (SAN ou NAS) et distant avec bien sûr un peu d’IA pour optimiser les réponses aux requêtes. “L'adoption généralisée de l'IA, dont tout le monde se vante actuellement concerne principalement les LLM. La question est toutefois d’utiliser l'IA dans son contexte et avec sa propre pile de stockage. Une fois que nous aurons traversé la vague d'enthousiasme pour ChatGPT et autres, que les gens auront compris que c'est vraiment cool, mais que cela ne résout pas vraiment de problèmes spécifiques, l'IA à usage spécifique [avec machine learning et inférence] va redevenir importante” a expliqué le CRO. ",
    category: 'Gestion des données'
  },
  // Ajoutez d'autres publications
  // ...
];

const itemsPerPage = 3;

const handleShareOnFacebook = (post) => {
  window.FB.ui({
    method: 'share',
    href: 'URL_DE_VOTRE_PUBLICATION',
    quote: `${post.title} - ${post.description} par ${post.author}`,
  }, function(response){});
};

const handleShareOnTwitter = (post) => {
  window.open(`https://twitter.com/intent/tweet?url=URL_DE_VOTRE_PUBLICATION&text=${post.title} - ${post.description} par ${post.author}`, '_blank');
};

const Post = ({ post }) => (
  <div className="bg-white shadow-lg p-6 rounded-md mb-4">
    <div className="flex items-center mb-2">
      <img
        src={post.authorImage}
        alt={`${post.author}'s Image`}
        className="h-10 w-10 rounded-full mr-2"
      />
      <div className="flex-1">
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <span className="mr-2">{post.author}</span>
          <span>{post.date}</span>
          <span className="ml-2">Catégorie: {post.category}</span>
        </div>
        <h2 className="text-xl font-semibold">{post.title}</h2>
      </div>
    </div>
    <p className="text-gray-600">{post.description}</p>
    <div className="mt-4 flex items-center space-x-4">
      <button
        onClick={() => handleShareOnFacebook(post)}
        className="flex items-center bg-blue-600 text-white px-3 py-1 rounded"
      >
        <FontAwesomeIcon icon={faFacebook} className="mr-2" />
        Facebook
      </button>
      <button
        onClick={() => handleShareOnTwitter(post)}
        className="flex items-center bg-blue-400 text-white px-3 py-1 rounded"
      >
        <FontAwesomeIcon icon={faTwitter} className="mr-2" style={{ fontSize: '20px' }} />
        Twitter
      </button>
      {/* Bouton Comment */}
      <button className="flex items-center bg-green-500 text-white px-3 py-1 rounded">
        Comment
      </button>
    </div>
  </div>
);

const Forum = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="bg-white-900">
      {/* Barre de navigation */}
      <nav className="bg-black p-12">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-white text-lg font-bold"></a>
          {/* Ajoutez des liens/boutons de navigation supplémentaires ici */}
        </div>
      </nav>

      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to our Blog</h1>
        <p className="text-lg text-center text-gray-500 mb-8">Explore the latest news and trends in the field of technology.</p>
        <div>
          {currentPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: Math.ceil(posts.length / itemsPerPage) }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-2 px-4 py-2 bg-blue-500 text-white rounded ${currentPage === index + 1 ? 'font-bold' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;