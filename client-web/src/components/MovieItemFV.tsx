import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import type { MovieItem } from "@/lib/api-fetch/api.types";
import { getThumbnail } from "@/lib/api-fetch/movie.fetch";

interface PropType {
  id: string;
  details: MovieItem;
}
function MovieItemFV({ id, details }: PropType) {
  const location = useLocation();
  const thumbRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (details.thumbnail && thumbRef.current)
      getThumbnail(details.thumbnail, thumbRef.current);
  }, []);

  if (!details) return null;
  return (
    <Link to={`/movie?id=${id}`} state={{ background: location, details }}>
      <figure className="overflow-hidden w-fit m-2   ">
        <img
          ref={thumbRef}
          alt={details.title}
          className=" w-[200px] h-[300px] rounded-md border-solid border-2 border-[#FFF2]"
          title={details.title}
        />
        <figcaption className="w-[200px]">
          <div
            className="truncate font-semibold capitalize text-center"
            title={details.title}
          >
            {details.title}
          </div>
          <div className="flex flex-row items-center justify-between text-sm text-slate-800 relative z-1">
            <span className=" text-yellow-600 font-bold absolute top-[-50px] right-[10px] z-2 flex flex-row items-center justify-center gap-1 shadow-lg">
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
