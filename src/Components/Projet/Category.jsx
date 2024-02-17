import React from 'react';

const Category = ({ onSelectCategory, selectedCategory, uniqueTechnologies }) => {
  return (
    <div>
      <button
        onClick={() => onSelectCategory(null)}
        className={`mr-2 ${selectedCategory === null ? 'active-button' : ''}`}
      >
        All
      </button>
      {uniqueTechnologies.map((technology) => (
        <button
          onClick={() => onSelectCategory(technology)}
          className={`mr-2 ${selectedCategory === technology ? 'active-button' : ''}`}
          key={technology}
        >
          {technology}
        </button>
      ))}
    </div>
  );
};

export default Category;
