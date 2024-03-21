// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import { useGlobalContext } from "./context";

import Navbar from "./components/Navbar";
// import { Home } from "./pages/Home";
// import { PageNotFound } from "./pages/PageNotFound";
import ScrollToTop from "./components/ScrollToTop";
import SearchForm from "./components/Search";
import "./styles/Navbar.css";
import "./styles/App.css";

import "./styles/CatsSection.css";
import "./styles/CatCard.css";
import "./styles/Loader.css";
import CatsList from "./components/CatsList";

function App() {
  const [isMounted, setIsMounted] = useState(false);
  const { themeName } = useGlobalContext();

  useEffect(() => {
    const oldThemeName = themeName === "dark" ? "light" : "dark";
    document.body.classList.remove(oldThemeName);
    document.body.classList.add(themeName);
  }, [themeName]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>Noone</>;
  }
  return (
    <div id="top" className="app">
      <Navbar />

      <main>
        <div className="animate__animated animate__fadeIn animate__delay-5s">
          <SearchForm />
          <CatsList />
        </div>
      </main>

      <ScrollToTop />
    </div>
  );
}
{
  /* <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="favorites" element={<>Favorites</>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router> */
}

export default App;
