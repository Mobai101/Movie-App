import { useEffect, useState } from "react";

const useFetchMovie = (url, applyData) => {
  const [movieState, setMovieState] = useState();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Cound not Fetch movie!");
        }
        const result = await response.json();
        setMovieState(result.results);
        applyData(result.results);
      } catch (e) {
        alert(`${e.name}: ${e.message}`);
      }
    };
    fetchMovie();
  }, [url, applyData]);

  return { movieState, setMovieState };
};

export default useFetchMovie;
