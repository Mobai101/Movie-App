import React, { useState } from "react";
import classes from "./MovieList.module.css";
import { useCallback } from "react";
import useFetchMovie from "../hooks/useFetchMovie";
import MovieListItem from "./MovieListItem";
import Container from "../UI/Container";
import MovieDetail from "./MovieDetail";

const MovieList = ({ url, sectionName, type }) => {
  // Custom hook to fetch movie
  const applyData = useCallback(() => {}, []);
  const { movieState } = useFetchMovie(url, applyData);

  // State to hold current movie to show detail
  const [detailState, setDetailState] = useState();

  // Handle event user click movie item
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
        <section className={classes.movieList}>
          <Container>
            <h3>{sectionName}</h3>
          </Container>
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
          <Container>
            {detailState && (
              <MovieDetail movieState={movieState} detailState={detailState} />
            )}
          </Container>
        </section>
      )}
    </>
  );
};

export default MovieList;
