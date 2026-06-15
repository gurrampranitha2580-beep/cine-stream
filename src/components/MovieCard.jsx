import { useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import { IMAGE_BASE_URL } from "../services/tmdb";
import { FavoritesContext } from "../context/FavoritesContext";

import "../styles/movie.css";

function MovieCard({ movie }){

  const { addToFavorites, isFavorite } = useContext(FavoritesContext);

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  const favoriteStatus = isFavorite(movie.id);

  return(
    <div className="movie-card">

      <button
        className="heart-btn"
        onClick={() => addToFavorites(movie)}
        aria-label="Add to favorites"
      >
        {favoriteStatus ? <FaHeart /> : <FaRegHeart />}
      </button>

      {
        posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.title}
            loading="lazy"
          />
        ) : (
          <div className="no-poster">
            No Image
          </div>
        )
      }

      <div className="movie-info">
        <h2>{movie.title}</h2>

        <div className="movie-details">
          <span>{releaseYear}</span>
          <span>⭐ {movie.vote_average.toFixed(1)}</span>
        </div>
      </div>

    </div>
  )
}

export default MovieCard;