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
        "spotify-gray": {
          400: "#B3B3B3",
          500: "#565656",
          600: "#282828",
          700: "#242424",
          800: "#121212",
          900: "#040404",
        },
      },
      lineHeight: {
        "extra-loose": 2.5,
      },
    },
  },
  variants: {
    backgroundColor: ({ after }) => after(["group-hover"]),
    textColor: ({ after }) => after(["group-hover"]),
    gradientColorStops: ({ after }) => after(["group-hover"]),
  },
  plugins: [],
};
