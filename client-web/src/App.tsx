import { Route, Routes, useLocation } from "react-router-dom";
import AddMovie from "./pages/AddMovie";
import Header from "./components/Header";
import MovieView from "./pages/MoviesView";
import MovieDetails from "./pages/MovieDetails";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Header />

      <Routes location={background || location}>
        <Route path="/" element={<MovieView />} />
        <Route path="/new" element={<AddMovie />} />
        <Route path="/movie" element={<MovieDetails />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/new" element={<AddMovie />} />
          <Route path="/movie" element={<MovieDetails />} />
        </Routes>
      )}
    </>
  );
}

export default App;
