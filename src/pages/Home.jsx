import { useState, useEffect } from "react";
import { Search } from "../components/Search";
import { CatsList } from "../components/CatsList";
import { useGlobalContext } from "../context";

export const Home = () => {
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
    return null;
  }

  return (
    <main className="h-screen">
      <div className="flex flex-col items-center h-full">
        <Search />
        <CatsList />
      </div>
    </main>
  );
};
