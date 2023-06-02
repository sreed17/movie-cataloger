import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import Modal from "@/components/Modal";
import type { MovieItem } from "@/lib/api-fetch/api.types";
import {
  IoClose,
  IoDownload,
  IoPlay,
  IoSave,
  IoStar,
  IoTrashBin,
} from "react-icons/io5";
import Rating from "@/components/Rating";

//TODO: delete after testing
function getThumbnailURL(id?: string) {
  if (id) console.log("TODO: add a read getThumbnailURL function");
  const dummyImg =
    "https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_FMjpg_UX1000_.jpg";

  return dummyImg;
}
const dummyDetails: MovieItem = {
  title: "harry potter and the soccerers stone",
  language: "english",
  year: 2000,
  status: "watched",
  rating: 4,
  ext: "mp4",
};

function getVideoStreamUrl(id: string) {
  return "";
}

function getVideoDownloadUrl(id: string) {
  return "";
}

async function updateMovieInfo(id: string, updates: any) {
  return;
}

async function deleteMovie(id: string) {
  return;
}

//--------------------------

function MovieDetails() {
  const [playMode, setPlayMode] = useState(false);
  const [changes, setChanges] = useState<null | Partial<MovieItem>>(null);
  const [ratingEditor, setRatingEditor] = useState(false);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const location = useLocation();
  const [details, setDetails] = useState<MovieItem>(location.state.details);

  useEffect(() => {
    console.log(changes);
  }, [changes]);

  if (!id || !details) return null;
  return (
    <Modal isOpen={true}>
      <div className="w-full h-full flex flex-col md:flex-row">
        <div className="w-full h-[300px] md:w-[300px] md:h-full overflow-hidden ">
          <img
            src={getThumbnailURL(id)}
            alt={details.title}
            className="w-full md:h-full object-center md:object-cover opacity-60 hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        <div className="w-full h-full p-4 flex flex-col gap-4">
          <header className="flex flex-col gap-2">
            <h1 className="capitalize font-bold text-xl dark:text-slate-300">
              {details.title}
            </h1>
            <div className="w-fit flex flex-row items-center justify-between text-sm text-slate-800 ">
              <span className=" mr-4  text-slate-400 capitalize ">
                {details.language}
              </span>
              |<span className="  mx-4  text-slate-400">{details.year}</span>|
              <span className=" mx-4  text-yellow-600 font-bold  flex flex-row items-center justify-center gap-1 shadow-lg">
                {!ratingEditor ? (
                  <button
                    onClick={() => {
                      setRatingEditor(true);
                    }}
                    className="flex flex-row gap-1"
                  >
                    <IoStar size={16} />
                    {details.rating}
                  </button>
                ) : (
                  <div className="flex flex-row items-center justify-center">
                    <Rating
                      rating={details.rating}
                      onChange={(r) => {
                        const rating = r;
                        if (rating && r !== details.rating) {
                          setDetails((value) => ({ ...value, rating }));
                          setChanges((value) => ({ ...value, rating }));
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        setRatingEditor(false);
                      }}
                    >
                      <IoClose size={24} />
                    </button>
                  </div>
                )}
              </span>
              |
              <button
                className=" mx-4  text-slate-400 capitalize dark:bg-slate-700 p-1 px-4 rounded-md font-semibold"
                onClick={() => {
                  const status = ["new", "watching", "watched"];
                  const nextIndex =
                    (status.indexOf(details.status) + 1) % status.length;
                  const new_status = status[nextIndex] as MovieItem["status"];
                  console.log(new_status, nextIndex);
                  if (new_status !== details.status) {
                    setChanges((value) => ({
                      ...(value ?? {}),
                      status: new_status,
                    }));
                    setDetails((value) => ({
                      ...(value ?? {}),
                      status: new_status,
                    }));
                  }
                }}
              >
                {details.status}
              </button>
            </div>
          </header>
          <div className="w-full flex-1 grid place-content-center dark:bg-slate-800 overflow-hidden rounded-md">
            {!playMode ? (
              <button
                onClick={() => {
                  setPlayMode(true);
                }}
              >
                <IoPlay size={64} />
              </button>
            ) : (
              <video controls autoPlay className="w-full">
                <source src={getVideoStreamUrl(id)} />
              </video>
            )}
          </div>
          <footer className="w-full flex flex-row items-center justify-between">
            <div className="flex flex-row gap-2">
              {changes && Object.keys(changes).length > 0 && (
                <button
                  className="p-2 px-4 rounded-lg font-semibold text-sm text-slate-900 flex items-center justify-center bg-green-600"
                  onClick={() => {
                    updateMovieInfo(id, changes)
                      .then((resJson) => {
                        // condition for success
                        setChanges(null);
                      })
                      .catch((err) => console.log(err));
                  }}
                >
                  <IoSave size={32} />
                  Save Changes
                </button>
              )}
              <a
                href={getVideoDownloadUrl(id)}
                className="p-2 px-4 rounded-lg font-semibold text-sm text-slate-900 flex items-center justify-center bg-yellow-600"
              >
                <IoDownload size={32} />
                Download
              </a>
            </div>
            <button
              className="p-2 rounded-lg  text-red-500 flex items-center justify-center dark:bg-[#0005] bg-slate-200 "
              onClick={() => {
                deleteMovie(id)
                  .then((resJson) => {
                    // condition for success
                    setChanges(null);
                  })
                  .catch((err) => console.log(err));
              }}
            >
              <IoTrashBin size={24} />
            </button>
          </footer>
        </div>
      </div>
    </Modal>
  );
}

export default MovieDetails;
