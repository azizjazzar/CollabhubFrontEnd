import resolve from '@rollup/plugin-node-resolve';

export default {
  // Your other config settings
  plugins: [
    resolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.jsx'], // Include '.jsx'
    }),
    // other plugins like @rollup/plugin-babel if you're using them
  ],
};
