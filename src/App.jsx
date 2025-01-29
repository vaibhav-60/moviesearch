import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import MovieCard from "./components/MovieCard";
import { useDebounce } from 'react-use'

const API_BASE_URL =
  "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTljMjdhODhlMTZkMDQwYTUzMjQyMDE3NjE0NDJmNCIsIm5iZiI6MTczODA0NDY1OS44NjMwMDAyLCJzdWIiOiI2Nzk4NzRmMzA5YzI1MmUzYWIyM2ZlZmMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.FwACtOvaBnumak5X6ISFBqFXKhAypwVrat-f5oGFgE0",
  },
};

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [useDebounced, setUseDebounced] = useState('')

  useDebounce(() => setUseDebounced(searchTerm), 500, [searchTerm])

  useEffect(() => {
    const fetchMovies = async (query = "") => {
      try {
        const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        
        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
          throw new Error("failed to fetch movies");
        }

        const data = await response.json();

        if (data.response === `false`) {
          setErrorMessage(data.Error || "Failed to fetch movies");
          setMovieList([]);
          return;
        }
        setMovieList(data.results || []);
      } catch (error) {
        console.log(`Error while fetching Movies ${error}`);
        setErrorMessage("Error while fetching Movies, Please try again later");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies(useDebounced);
  }, [useDebounced]);

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="hero-img.png"></img>
          <h1>
            find <span className="text-gradient">Movie</span> which you like to
            watch
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>

          {loading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie = {movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
