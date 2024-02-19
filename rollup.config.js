import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js', // Point d'entrée de votre application
  output: {
    file: 'dist/bundle.js', // Le fichier de sortie
    format: 'cjs', // Le format du bundle (cjs pour CommonJS, esm pour ES Modules, etc.)
  },
  plugins: [
    resolve(), // Ajoutez ici d'autres plugins nécessaires
  ],
};
