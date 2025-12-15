// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          700: "#4B49AC",  // dark purple
          500: "#7DA0FA",  // mid blue
          400: "#98BDFF",  // light blue
          600: "#7978E9",  // indigo
        },
        accent: {
          pink: "#F3797E",
        },
        layout: {
          bg: "#F5F7FF",   // light gray-blue background
          sidebar: "#262B40",
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(76, 87, 125, 0.15)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
};
