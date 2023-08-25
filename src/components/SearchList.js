import React, { useState } from "react";
import classes from "./SearchList.module.css";
import { useCallback } from "react";
import useFetchMovie from "../hooks/useFetchMovie";
import MovieListItem from "./MovieListItem";
import Container from "../UI/Container";
import MovieDetail from "./MovieDetail";

const SearchList = ({ url, sectionName, type }) => {
  // Custom hook to fetch movie
  const applyData = useCallback(() => {}, []);
  const { movieState } = useFetchMovie(url, applyData);

  // State hold current movie to show detail
  const [detailState, setDetailState] = useState();

  // handle event user click into movie item
  const movieItemClickHandler = (e) => {
    if (e.target.dataset.id === detailState) {
      setDetailState(null);
    } else {
      setDetailState(e.target.dataset.id);
    }
  };

  return (
    <>
      {movieState && (
        <section className={classes.searchList}>
          <Container>
            {detailState && (
              <MovieDetail movieState={movieState} detailState={detailState} />
            )}

            <h3>{sectionName}</h3>

            <div className={classes.flexContainer}>
              {movieState.map((movie) => {
                return (
                  <MovieListItem
                    movie={movie}
                    key={movie.id}
                    type={type}
                    onClick={movieItemClickHandler}
                  />
                );
              })}
            </div>
          </Container>
          <footer></footer>
        </section>
      )}
    </>
  );
};

export default SearchList;
