import React, { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (imageSrc) => {
    if (favorites.includes(imageSrc)) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((src) => src !== imageSrc)
      );
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, imageSrc]);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
