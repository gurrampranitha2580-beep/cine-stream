import { useContext } from "react";

import MovieCard from "../components/MovieCard";

import { FavoritesContext } from "../context/FavoritesContext";

function Favorites(){

  const { favorites } = useContext(FavoritesContext);

  return(
    <div className="page">

      <h1 className="page-title">
        My Favorites
      </h1>

      {
        favorites.length === 0 ? (
          <h2 className="empty-text">
            No favorite movies added yet.
          </h2>
        ) : (
          
          <div className="movies-grid compact-grid">
            {
              favorites.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))
            }

          </div>
        )
      }

    </div>
  )
}

export default Favorites;