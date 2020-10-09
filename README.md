[![codecov](https://codecov.io/gh/AlexKMarshall/spotify-clone/branch/master/graph/badge.svg)](https://codecov.io/gh/AlexKMarshall/spotify-clone)

# Not-Spotfy - A clone of the Spotify Web Player

View in production: https://romantic-lichterman-d73293.netlify.app/

This is a work in progress clone of the Spotify Web Player

## Purpose

I'm building this as an exercise in creating a complex production-ready front-end app.

I want to get a deeper understanding of React, when there are more complex components and interactions involved. I wanted to do a full site build in React with Typescript. And I wanted to achieve as high coverage in testing as possible. Where possible this is being built using TDD.

## Usage

To use this app, you will need to log in with your Spotify account. It only retains your login for 60 minutes, and does not save or monitor any of your data. There is no backend apart from Spotify's own web services.

Once logged on, you should be able to use the player just the same as you would the official Spotify web player. You can view music, play music, save and remove items from your library (this will interact with your real Spotify library, so don't remove things unless you actually want to).

I itend to make this as fully featured as possible, within the limits of the public Spotify APIs

## Technology Used

- React
- Typescript
- Jest
- React Testing Library
- React Query
- TailwindCSS
- Spotify Web APIs
- Netlify
