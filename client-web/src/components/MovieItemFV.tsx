import { Link, useLocation } from "react-router-dom";
import { IoStar } from "react-icons/io5";

export type MovieItem = {
  title: string;
  language: string;
  year: number;
  status: "watching" | "watched";
  rating: number;
};

interface PropType {
  id: string;
  details: MovieItem;
}

// TODO: remove this after testing
function getThumbnailURL(id?: string) {
  if (id) console.log("TODO: add a read getThumbnailURL function");
  const dummyImg =
    "https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg";

  return dummyImg;
}
// --------------------------------

function MovieItemFV({ id, details }: PropType) {
  const location = useLocation();

  if (!details) return null;
  return (
    <Link to={`/movie?id=${id}`} state={{ background: location, details }}>
      <figure className="overflow-hidden w-fit m-2   ">
        <img
          src={getThumbnailURL(id)}
          alt={details.title}
          className=" w-[200px] h-[300px] rounded-md border-solid border-2 border-[#FFF2]"
          title={details.title}
        />
        <figcaption className="w-[200px]">
          <div
            className="truncate font-semibold capitalize"
            title={details.title}
          >
            {details.title}
          </div>
          <div className="flex flex-row items-center justify-between text-sm text-slate-800 relative">
            <span className=" text-yellow-600 font-bold absolute top-[-50px] right-[10px] flex flex-row items-center justify-center gap-1 shadow-lg">
              <IoStar size={16} />
              {details.rating}
            </span>
            <span className=" text-slate-400 capitalize ">
              {details.language}
            </span>{" "}
            |<span className="  text-slate-400">{details.year}</span>|
            <span className=" text-slate-400 capitalize">{details.status}</span>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}

export default MovieItemFV;
