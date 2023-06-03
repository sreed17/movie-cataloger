import { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { getThumbnail } from "@/lib/api-fetch/movie.fetch";
import type { MovieItem } from "@/lib/api-fetch/api.types";

interface PropType {
  id: string;
  details: MovieItem;
}

function MovieItemLV({ id, details }: PropType) {
  const location = useLocation();
  const thumbRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (details.thumbnail && thumbRef.current)
      getThumbnail(details.thumbnail, thumbRef.current);
  }, []);

  if (!details) return null;
  return (
    <Link to={`/movie?id=${id}`} state={{ background: location, details }}>
      <figure className="overflow-hidden w-fit m-2 flex flex-row-reverse items-center justify-start gap-4 ">
        <img
          ref={thumbRef}
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
