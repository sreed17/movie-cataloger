import { useEffect, useState } from "react";
import { fetchAllMovies } from "@/lib/api-fetch/movie.fetch";
import { verifyResponse } from "@/lib/api-fetch/securefetch";

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchAllMovies()
      .then((resJson) => {
        verifyResponse(resJson, (err, payload) => {
          if (err) return console.log(err);
          setMovies(payload);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {movies.map((movie, index) => (
        <div key={`movie-${index}`}>{JSON.stringify(movie)}</div>
      ))}
    </div>
  );
}

export default HomePage;
