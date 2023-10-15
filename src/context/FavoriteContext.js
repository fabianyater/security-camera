import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

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
      toast.success("Image removed from favorites", { icon: '💔' });
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, imageSrc]);
      toast.success("Image added to favorites", { icon: '❤️' });
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}
