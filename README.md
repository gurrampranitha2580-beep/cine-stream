# CineStream

CineStream is a Netflix-inspired movie discovery web application built using React and the TMDB API.

Users can explore popular movies, search movies dynamically, save favorites, and experience optimized infinite scrolling with responsive UI design.

## Features

* Browse popular movies from TMDB
* Search movies with debounced API requests
* Infinite scrolling using IntersectionObserver
* Favorites system with Context API
* localStorage persistence for favorites
* Responsive movie grid layout
* Lazy-loaded movie posters
* Missing poster fallback handling
* Clean dark-themed UI

## Tech Stack

* React
* Vite
* React Router DOM
* Axios
* Context API
* CSS Grid
* TMDB API

## Performance Optimizations

* Debounced search (500ms)
* Infinite scroll pagination
* Duplicate movie prevention
* Lazy image loading
* Cleanup for timers and observers

## Environment Variables

Create a `.env` file and add:

VITE_TMDB_KEY=your_tmdb_api_key

## Run Locally

npm install

npm run dev

## Deployment

Deployed using Vercel.
