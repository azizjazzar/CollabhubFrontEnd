import React from 'react';

const PostDetail = ({ post }) => (
  <div className="bg-white shadow-lg p-6 rounded-md mb-4">
    <div className="flex items-center mb-2">
      {/* Affichez les détails de la publication ici */}
      <h2 className="text-xl font-semibold">{post.title}</h2>
      {/* Ajoutez d'autres détails selon vos besoins */}
    </div>
    <p className="text-gray-600">{post.description}</p>
    {/* Ajoutez d'autres détails selon vos besoins */}
  </div>
);

export default PostDetail;