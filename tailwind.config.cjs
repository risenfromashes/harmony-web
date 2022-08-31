module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: [
    "text-2xl",
    "text-3xl",
    "text-4xl",
    "text-5xl",
    "text-6xl",
    "sm:text-2xl",
    "sm:text-3xl",
    "sm:text-4xl",
    "sm:text-5xl",
    "sm:text-6xl",
    "md:text-2xl",
    "md:text-3xl",
    "md:text-4xl",
    "md:text-5xl",
    "md:text-6xl",
    "lg:text-2xl",
    "lg:text-3xl",
    "lg:text-4xl",
    "lg:text-5xl",
    "lg:text-6xl",
  ],
  theme: {
    extend: {
      backgroundImage: {
        forest:
          "linear-gradient(to bottom, #00000045, #00000096), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e')",
        nebula:
          "linear-gradient(to bottom, #0f172a96, #0f172a96), url('/assets/bg-nebula.jpeg')",
      },
      fontFamily: {
        Hahmlet: ["Hahmlet", "serif"],
        JosefinSans: ["Josefin Sans", "sans-serif"],
        Oxygen: ["Oxygen", "sans-serif"],
        Roboto: ["Roboto", "sans-serif"],
        RobotoSlab: ["Roboto Slab", "serif"],
        Noto: ["Noto Serif", "serif"],
        OpenSans: ["Open Sans", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
