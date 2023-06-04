import CustomFileInput from "@/components/CustomFileInput";
import { useState, useEffect } from "react";
import Modal from "@/components/Modal";
import { createMovieEntryFromForm2 } from "@/lib/api-fetch/movie.fetch";
import { IoCloudUpload, IoImage } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function AddMovie() {
  const navigate = useNavigate();
  const [thumbFile, setThumbFile] = useState<null | string>(null);
  const [videoFile, setVideoFile] = useState<null | string>(null);
  const [uploadProgress, setUploadProgress] = useState<undefined | number>(
    undefined
  );

  useEffect(() => {
    return () => {
      if (thumbFile) {
        window.URL.revokeObjectURL(thumbFile);
        console.log("Cleaned up, add movie, url Revoked");
      }
    };
  }, [thumbFile]);

  return (
    <Modal isOpen={true}>
      <form
        encType="multipart/form-data"
        className="w-full h-full dark:bg-slate-900 flex flex-col md:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          createMovieEntryFromForm2(
            e.currentTarget,
            (percent) => {
              setUploadProgress(percent);
            },
            () => {
              navigate("/");
            }
          );
        }}
      >
        <div className="w-full h-[200px] md:w-[200px] md:h-full dark:bg-slate-800 overflow-hidden relative">
          {thumbFile && (
            <img
              src={thumbFile}
              alt=""
              className="absolute z-[0] w-full md:object-cover md:h-full"
            />
          )}
          <CustomFileInput
            className="z-10 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"
            name="thumbnail"
            icon={<IoImage size={64} className="dark:text-slate-400" />}
            label="Upload Thumbnail"
            onChange={(e) => {
              if (e.target.files) {
                const f_url = window.URL.createObjectURL(e.target.files[0]);
                setThumbFile(f_url);
              }
            }}
          />
        </div>
        <div className="w-full h-full p-4 flex flex-col gap-2">
          <div className="flex flex-col gap-4 flex-1 md:flex-row">
            <div className="flex flex-col flex-1 gap-2">
              <h1 className="font-semibold text-xl dark:text-slate-700">
                Add Movie
              </h1>
              <label htmlFor="nm-title" className="inp-label">
                Title
              </label>
              <input
                type="text"
                id="nm-title"
                name="title"
                className="inp-text"
              />
              <label htmlFor="nm-language" className="inp-label">
                Language
              </label>
              <input
                type="text"
                id="nm-language"
                name="language"
                className="inp-text"
              />
              <label htmlFor="nm-year" className="inp-label">
                Year
              </label>
              <input
                type="number"
                id="nm-year"
                name="year"
                className="inp-text"
              />
              <label htmlFor="nm-status" className="inp-label">
                Status
              </label>
              <select
                name="status"
                id="nm-status"
                defaultValue={"new"}
                className="inp-text"
              >
                <option value="new">New</option>
                <option value="watching">Watching</option>
                <option value="watched">Watched</option>
              </select>
            </div>
            <div className="w-full md:w-[160px] grid place-content-center overflow-hidden">
              <CustomFileInput
                name="movie"
                icon={
                  <IoCloudUpload
                    size={64}
                    className="dark:text-slate-400 w-full md:max-w-[100px]"
                  />
                }
                label={videoFile ? videoFile : "Upload Movie"}
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    setVideoFile(file.name);
                  }
                }}
              />
            </div>
          </div>
          <div className="p-2 flex flex-row items-end justify-center border-t-2 border-solid dark:border-t-slate-700">
            <button
              className="p-2 bg-yellow-600 rounded-full w-full"
              disabled={
                typeof uploadProgress !== "undefined" && uploadProgress >= 0
              }
            >
              {uploadProgress ? (
                <progress max={100} value={uploadProgress} />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddMovie;
