module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        "spotify-green": "#1DB954",
        "spotify-gray": {
          400: "#B3B3B3",
          500: "#565656",
          600: "#282828",
          700: "#242424",
          800: "#121212",
          900: "#040404",
        },
      },
      spacing: {
        14: "3.5rem",
        22: "5.5rem",
        200: "50rem",
      },
      lineHeight: {
        "extra-loose": 2.5,
      },
      gridTemplateColumns: {
        "album-cards": "repeat(auto-fill, minmax(10.5rem, 1fr))",
      },
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["group-hover"]),
    textColor: ({ after }) => after(["group-hover"]),
    gradientColorStops: ({ after }) => after(["group-hover"]),
    visibility: ({ after }) => after(["group-hover"]),
  },
  plugins: [],
};
