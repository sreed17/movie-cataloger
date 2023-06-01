import { Link, useLocation } from "react-router-dom";
import {} from "react-icons/io5";

function Header() {
  const location = useLocation();
  return (
    <header className="flex flex-row items-center justify-between">
      <h1 className="font-semibold text-xl">
        Movie Cataloger <span className="text-sm">v1.0</span>
      </h1>
      <Link to="/new" state={{ background: location }}>
        Add Movie
      </Link>
    </header>
  );
}

export default Header;
