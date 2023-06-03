import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllMovies } from "@/lib/api-fetch/movie.fetch";
import { verifyResponse } from "@/lib/api-fetch/securefetch";
import MovieItemFV from "@/components/MovieItemFV";
import MovieItemLV from "@/components/MovieItemLV";
import { MovieItem } from "@/lib/api-fetch/api.types";

function MoviesView() {
  const [movies, setMovies] = useState([]);
  const [searchParams] = useSearchParams();
  const view = searchParams.get("view");

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

  if (view === "list")
    return (
      <div className="w-full flex flex-col flex-wrap gap-2 items-center">
        {movies.map((item: MovieItem, i) => (
          <MovieItemLV key={item._id} id={item._id} details={item} />
        ))}
      </div>
    );

  return (
    <div className="w-full flex flex-row flex-wrap gap-2 items-start justify-center">
      {movies.map((item: MovieItem, i) => (
        <MovieItemFV key={item._id} id={item._id} details={item} />
      ))}
    </div>
  );
}

export default MoviesView;
