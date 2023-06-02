import CustomFileInput from "@/components/CustomFileInput";
import Modal from "@/components/Modal";
import { IoCloudUpload, IoImage } from "react-icons/io5";

function handleSubmit(trg: HTMLFormElement) {
  //const fd_movieFile = new FormData();
  //fd_movieFile.append("movie", trg.files[0]);
  const fd_movieInfo = new FormData(trg);
  for (const [key, val] of fd_movieInfo.entries()) {
    console.log(key, val);
  }
}

function AddMovie() {
  return (
    <Modal isOpen={true}>
      <form
        className="w-full h-full dark:bg-slate-900 flex flex-col md:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e.currentTarget);
        }}
      >
        <div className="w-full h-[200px] md:w-[200px] md:h-full dark:bg-slate-800 grid place-content-center">
          <CustomFileInput
            name="thumbnail"
            icon={<IoImage size={64} className="dark:text-slate-400" />}
            label="Upload Thumbnail"
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
                name="langauage"
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
                name="nm-status"
                defaultValue={"new"}
                className="inp-text"
              >
                <option value="new">New</option>
                <option value="watching">Watching</option>
                <option value="watched">Watched</option>
              </select>
            </div>
            <div className="w-full md:w-[160px] grid place-content-center">
              <CustomFileInput
                name="movie"
                icon={
                  <IoCloudUpload size={64} className="dark:text-slate-400" />
                }
                label="Upload Movie"
              />
            </div>
          </div>
          <div className="p-2 flex flex-row items-end justify-center border-t-2 border-solid dark:border-t-slate-700">
            <button className="p-2 bg-yellow-600 rounded-full w-full">
              Submit
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default AddMovie;
