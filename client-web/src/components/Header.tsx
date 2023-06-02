import { Link, useLocation, useSearchParams } from "react-router-dom";
import { IoAddCircle, IoFilter, IoList, IoSearch } from "react-icons/io5";

function Header() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get("view");

  return (
    <header className="flex flex-row items-center justify-center gap-4 m-4 ">
      <div className="w-full md:w-[40%] flex flex-row items-center justify-center gap-2 border-solid border-2 dark:border-slate-900 px-4 rounded-full">
        <button>
          <IoSearch size={32} />
        </button>
        <input
          className="bg-transparent p-2 h-full w-full outline-none"
          type="text"
          placeholder="Search"
        />
        <div className=" flex flex-row items-center justify-center gap-2 border-solid border-l-2 dark:border-slate-900 px-4">
          <button>
            <IoFilter size={32} />
          </button>
          <button
            onClick={() => {
              setSearchParams(
                view === "list" ? { view: "album" } : { view: "list" }
              );
            }}
          >
            <IoList
              size={32}
              className={view === "list" ? "text-yellow-500" : ""}
            />
          </button>
        </div>
      </div>
      <Link to="/new" state={{ background: location }}>
        <IoAddCircle size={40} />
      </Link>
    </header>
  );
}

export default Header;
