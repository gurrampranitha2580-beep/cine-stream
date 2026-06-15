import { useEffect, useRef, useState } from "react";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

import useDebounce from "../hooks/useDebounce";

import {
  getPopularMovies,
  searchMovies
} from "../services/tmdb";

function Home(){

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);

  const debouncedSearchText = useDebounce(searchText, 500);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [debouncedSearchText]);

  useEffect(() => {
    fetchMovies();
  }, [page, debouncedSearchText]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      if(firstEntry.isIntersecting && !loading && hasMore){
        setPage((currentPage) => currentPage + 1);
      }
    });

    const currentLoader = loaderRef.current;

    if(currentLoader){
      observer.observe(currentLoader);
    }

    return () => {
      if(currentLoader){
        observer.unobserve(currentLoader);
      }
    }
  }, [loading, hasMore]);

  const fetchMovies = async () => {
    try{
      setLoading(true);

      let data;

      if(debouncedSearchText.trim() === ""){
        data = await getPopularMovies(page);
      }
      else{
        data = await searchMovies(debouncedSearchText, page);
      }

      setMovies((oldMovies) => {
        if(page === 1){
          return data.results;
        }

        
        const combinedMovies = [...oldMovies, ...data.results];

        const uniqueMovies = combinedMovies.filter((movie,index,self) =>
          index === self.findIndex((item) => item.id === movie.id)
        );

         return uniqueMovies;
      });

      if(page >= data.total_pages){
        setHasMore(false);
      }
    }
    catch(error){
      console.log("Movie fetch error", error);
    }
    finally{
      setLoading(false);
    }
  }

  return(
    <div className="page">
      <h1 className="page-title">Popular Movies</h1>

      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {movies.length === 0 && loading ? (
        <h2>Loading movies...</h2>
      ) : (
        <>
          {
          !loading && 
          movies.length === 0 && (
            <h2 className="empty-text">
              No movies found.
            </h2>)
          }

          
          <div className={debouncedSearchText.trim() === "" ? "movies-grid" : "movies-grid compact-grid"}>
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}
          </div>

          {hasMore && (
            <div ref={loaderRef} className="scroll-loader">
              {loading ? "Loading more movies..." : "Scroll for more"}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home;