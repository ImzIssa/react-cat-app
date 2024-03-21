/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect, useMemo } from "react";
import { useCallback } from "react";
import axios from "axios";
import data from "./data/data.json";

const API_KEY = import.meta.env.VITE_CATS_API_KEY;
const url = "https://api.thecatapi.com/v1/images/search?limit=10";
const breeds_url = `https://api.thecatapi.com/v1/breeds`;
// const breeds_url = `https://api.thecatapi.com/v1/breeds`;
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("a");
  const [searchList, setSearchList] = useState([]);
  const [cats, setCats] = useState(data);

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
      // const response = await axios.get(`${url}${searchTerm}`, {
      // const response = await axios.get(breeds_url, {
      // headers: {
      // "x-api-key": API_KEY,
      // },
      // });
      const _data = data.filter((img) => img.image?.url != null);
      const categories = _data.map(({ id, name }) => ({ id, name }));
      // let data = response.data;
      console.log(_data);
      setCats(_data);
      setSearchList(categories);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  // useEffect(() => {
  //   fetchCats();
  // }, [searchTerm, fetchCats]);

  useEffect(() => {
    fetchCatsBreeds();
  }, [searchTerm, fetchCatsBreeds]);

  const filteredCats = useMemo(() => {
    return cats.filter((cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [cats, searchTerm]);

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
