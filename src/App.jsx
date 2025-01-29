import React, { useEffect, useState } from "react";
import Search from "./components/Search";
import Spinner from "./components/Spinner";

const API_BASE_URL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const endpoint = `${API_BASE_URL}`;
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
    fetchMovies();
  }, []);

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
                <li key = {movie.id}className="text-white">
                  {movie.title}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
