module.exports = {
  content: [
    "./src/**/*.{html,js,svelte,ts}",
    "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
  ],

  theme: {
    extend: {
      colors: {},
      fontFamily: {
       Hahmlet: ["Hahmlet", "serif"],
       Rampart: ["Rampart One", "cursive"],
       Rubik: ["Rubik", "sans-serif"],
       Roboto: ["Roboto Slab", "serif"],
      },
    },
  },

  // plugins: [
  //   require('flowbite/plugin')
  // ],
  // darkMode: 'class',
};
