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

function MovieItemLV({ id, details }: PropType) {
  const location = useLocation();

  if (!details) return null;
  return (
    <Link to={`/movie?id=${id}`} state={{ background: location, details }}>
      <figure className="overflow-hidden w-fit m-2 flex flex-row-reverse items-center justify-start gap-4 ">
        <img
          src={getThumbnailURL(id)}
          alt={details.title}
          className=" w-[80px] h-[100px] rounded-md border-solid border-2 border-[#FFF2]"
          title={details.title}
        />
        <figcaption className="w-full">
          <div
            className="truncate font-semibold capitalize"
            title={details.title}
          >
            {details.title}
          </div>
          <div className="w-fit flex flex-row items-center justify-between text-sm text-slate-800 ">
            <span className=" text-yellow-600 font-bold  flex flex-row items-center justify-center gap-1 shadow-lg pr-4">
              <IoStar size={16} />
              {details.rating}
            </span>
            |
            <span className=" text-slate-400 capitalize  px-4">
              {details.language}
            </span>{" "}
            |<span className="  text-slate-400 px-4">{details.year}</span>|
            <span className=" text-slate-400 capitalize px-4">
              {details.status}
            </span>
          </div>
        </figcaption>
      </figure>
    </Link>
  );
}

export default MovieItemLV;
