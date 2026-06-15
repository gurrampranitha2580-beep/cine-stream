import { useContext } from "react";
import { Link } from "react-router-dom";

import { FavoritesContext } from "../context/FavoritesContext";

import "../styles/navbar.css";

function Navbar(){

  const { favorites } = useContext(FavoritesContext);

  return(
    <nav className="navbar">

      <h1>CineStream</h1>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/favorites">
          {favorites.length > 0
            ? `Favorites (${favorites.length})`
            : "Favorites"
          }
        </Link>

      </div>

    </nav>
  )
}

export default Navbar;