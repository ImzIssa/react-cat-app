import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import { useState, useEffect } from "react";
import { useGlobalContext } from "./context";

import "./styles/Navbar.css";
import "./styles/App.css";
import "./styles/CatsSection.css";
import "./styles/CatCard.css";
import "./styles/Loader.css";
import "./styles/ScrollToTop.css";
import CatDetailsPage from "./pages/CatDetailsPage";

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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cat/:id/details" element={<CatDetailsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <ScrollToTop />
    </div>
  );
}

export default App;
