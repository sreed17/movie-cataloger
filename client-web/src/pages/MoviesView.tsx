import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchAllMovies } from "@/lib/api-fetch/movie.fetch";
import { verifyResponse } from "@/lib/api-fetch/securefetch";
import MovieItemFV, { MovieItem } from "@/components/MovieItemFV";
import MovieItemLV from "@/components/MovieItemLV";

// TODO: remove this after testing

const dummyDetails: MovieItem = {
  title: "harry potter and the soccerers stone",
  language: "english",
  year: 2000,
  status: "watched",
  rating: 4,
};

const MovieList = new Array(5).fill(dummyDetails);

// --------------------------------

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
        {MovieList.map((item, i) => (
          <MovieItemLV key={`test-${i}`} id={`test-${i}`} details={item} />
        ))}
      </div>
    );

  return (
    <div className="w-full flex flex-row flex-wrap gap-2 items-start justify-center">
      {MovieList.map((item, i) => (
        <MovieItemFV key={`test-${i}`} id={`test-${i}`} details={item} />
      ))}
    </div>
  );
}

export default MoviesView;
