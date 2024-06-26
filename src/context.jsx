/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect, useMemo } from "react";
import { useCallback } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_CATS_API_KEY;
// const url = "https://api.thecatapi.com/v1/images/search?limit=10";
const breeds_url = `https://api.thecatapi.com/v1/breeds`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const darkMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setThemeName(
      localStorage.getItem("themeName") ||
        (darkMediaQuery.matches ? "dark" : "light")
    );
  }, []);

  const toggleTheme = () => {
    const name = themeName === "dark" ? "light" : "dark";
    localStorage.setItem("themeName", name);
    setThemeName(name);
  };

  const fetchCatsBreeds = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(breeds_url, {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      const data = await response.data;
      const _data = data.filter((img) => img.image?.url != null);
      const categories = _data.map(({ id, name }) => ({ id, name }));

      setCats(_data);
      setSearchList(categories);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCatsBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredCats = useMemo(() => {
    return cats.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cats, searchTerm]);

  const singleCat = (id) => {
    setSearchTerm("");
    return cats.filter((cat) => cat.id === id)[0];
  };

  return (
    <AppContext.Provider
      value={{
        themeName,
        searchList,
        toggleTheme,
        loading,
        filteredCats,
        searchTerm,
        setSearchTerm,
        singleCat,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
