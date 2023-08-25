import classes from "./MovieListItem.module.css";

const MovieListItem = ({ movie, type, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/w780/${
          type === "poster" ? movie.poster_path : movie.backdrop_path
        }")`,
      }}
      className={`${classes.movieItem} ${
        type === "poster" ? classes.poster : classes.backdrop
      }`}
      data-id={movie.id}
    ></div>
  );
};

export default MovieListItem;
