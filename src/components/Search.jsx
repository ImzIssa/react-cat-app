import { useGlobalContext } from "../context";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

import "../styles/SearchForm.css";

const SearchForm = () => {
  const { setSearchTerm, searchList } = useGlobalContext();

  const handleOnSelect = ({ name }) => setSearchTerm(name);

  const handleOnClear = () => setSearchTerm("");

  const formatResult = (item) => {
    return (
      <span style={{ display: "block", textAlign: "left" }}>
        name: {item.name}
      </span>
    );
  };

  return (
    <div className="form-container">
      <div style={{ width: 500 }}>
        <ReactSearchAutocomplete
          items={searchList ?? []}
          // onSearch={handleOnSearch}
          onSelect={handleOnSelect}
          onClear={handleOnClear}
          styling={{
            zIndex: 1,
            height: "44px",
            border: "none",
            borderRadius: "24px",
            backgroundColor: "white",
            boxShadow: "",
            hoverBackgroundColor: "#eee",
            color: "#212121",
            fontSize: "16px",
            fontFamily: "Arial",
            iconColor: "grey",
            lineColor: "rgb(232, 234, 237)",
            placeholderColor: "grey",
            clearIconMargin: "3px 14px 0 0",
            searchIconMargin: "0 0 0 16px",
          }}
          placeholder="Search for type of Cat"
          formatResult={formatResult}
          autoFocus
        />
      </div>
    </div>
  );
};

export default SearchForm;
