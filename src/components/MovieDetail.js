import { useEffect, useState } from "react";
import classes from "./MovieDetail.module.css";

const API_KEY = "6ecbaab87951fbdafa9c8b6087d9eb83";

const MovieDetail = ({ movieState, detailState }) => {
  // State to store video array from fetch
  const [videoState, setVideoState] = useState();

  // Find the index of selected movie
  const selectedMovie = movieState.findIndex(
    (movie) => +movie.id === +detailState
  );

  // Find the best movie in array
  let bestTrailer;
  let bestTeaser;
  if (videoState) {
    bestTrailer = videoState.find(
      (video) => video.site === "YouTube" && video.type === "Trailer"
    );
    bestTeaser = videoState.find(
      (video) => video.site === "YouTube" && video.type === "Teaser"
    );
  }

  // Fetch video
  useEffect(() => {
    const fetchYoutube = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3//movie/${detailState}/videos?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Cound not Fetch video!");
        }
        const result = await response.json();
        setVideoState(result.results);
      } catch (e) {
        // If error, set the video state to empty array, similar to some movie that also return an empty array
        setVideoState([]);
      }
    };
    fetchYoutube();
  }, [detailState]);

  // Render the video frame conditionally.
  const VideoRender = () => {
    // Render backdrop if video not found
    if (!videoState) {
      return (
        <img
          src={`https://image.tmdb.org/t/p/w780/${movieState[selectedMovie].backdrop_path}`}
          alt={`${
            movieState[selectedMovie].name || movieState[selectedMovie].title
          }`}
        />
      );
    } else if (videoState.length === 0) {
      return (
        <img
          src={`https://image.tmdb.org/t/p/w780/${movieState[selectedMovie].backdrop_path}`}
          alt={`${
            movieState[selectedMovie].name || movieState[selectedMovie].title
          }`}
        />
      );

      // Render trailer if trailer is found
    } else if (bestTrailer) {
      return (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${bestTrailer.key}`}
          title={`${bestTrailer.name} ${bestTrailer.id}`}
        ></iframe>
      );

      // Render Teaser if teaser if found, after trailer
    } else if (bestTeaser) {
      return (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${bestTeaser.key}`}
          title={`${bestTeaser.name} ${bestTeaser.id}`}
        ></iframe>
      );

      // If nothing is found, return error message
    } else {
      return <p>Something went wrong!</p>;
    }
  };

  return (
    <div className={classes.moviedetail}>
      {/* Text section */}
      <div className={classes.detailText}>
        <h1>
          {movieState[selectedMovie].name || movieState[selectedMovie].title}
        </h1>
        <h4>Release Date: {movieState[selectedMovie].first_air_date}</h4>
        <h4>Vote: {movieState[selectedMovie].vote_average} / 10</h4>
        <p>{movieState[selectedMovie].overview}</p>
      </div>

      {/* Video Section */}
      <div className={classes.detailVideo}>
        <VideoRender />
      </div>
    </div>
  );
};

export default MovieDetail;
