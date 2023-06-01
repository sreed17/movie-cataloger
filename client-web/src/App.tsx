import { Route, Routes, useLocation } from "react-router-dom";
import AddMovie from "./pages/AddMovie";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Header />

      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<AddMovie />} />
      </Routes>
      {background && (
        <Routes>
          <Route path="/new" element={<AddMovie />} />
        </Routes>
      )}
    </>
  );
}

export default App;
