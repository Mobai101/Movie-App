import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import SearchForm from "../../components/SearchForm";
import SearchList from "../../components/SearchList";

const Search = () => {
  // State to store search result
  const [searchState, setSearchState] = useState(null);

  // Random key to re-render SearchList when click Submit. This is to prevent error from MovieDetail component
  const [randomKey, setRandomKey] = useState(0);

  // Received search data from SearchForm component
  const submitHandler = (searchData) => {
    if (!searchData.trim()) return;

    setRandomKey((key) => key + 1);

    setSearchState(searchData);
  };

  // Reset search state. Input field is cleared in SearchForm component
  const resetHandler = () => {
    setSearchState(null);
  };

  return (
    <div className="app">
      <NavBar />
      <SearchForm
        submitHandler={submitHandler}
        resetHandler={resetHandler}
        searchState={searchState}
      />
      {searchState && (
        <SearchList
          url={`https://api.themoviedb.org/3/search/movie?api_key=6ecbaab87951fbdafa9c8b6087d9eb83&language=en-US&query=${searchState}`}
          sectionName="Search Result"
          type="poster"
          key={randomKey}
        />
      )}
    </div>
  );
};

export default Search;
