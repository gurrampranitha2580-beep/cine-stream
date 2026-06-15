import { createContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

function FavoritesProvider({ children }){

  const [favorites, setFavorites] = useState(() => {
    const savedItems = localStorage.getItem("favorites");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  const addToFavorites = (movie) => {
    const alreadyAdded = favorites.find((item) => item.id === movie.id);

    if(alreadyAdded){
      const updatedList = favorites.filter((item) => item.id !== movie.id);
      setFavorites(updatedList);
    }
    else{
      setFavorites([...favorites, movie]);
    }
  }

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return(
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        isFavorite
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesProvider;