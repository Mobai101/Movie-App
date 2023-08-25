import classes from "./Banner.module.css";
import Container from "../UI/Container";
import { useCallback, useState } from "react";
import useFetchMovie from "../hooks/useFetchMovie";

const Banner = ({ url }) => {
  // State to hold a random number to index a banner
  const [randomIndex, setRandomIndex] = useState(0);

  // Custom hook to fetch movie
  const applyData = useCallback((data) => {
    setRandomIndex(Math.floor(Math.random() * data.length));
  }, []);
  const { movieState } = useFetchMovie(url, applyData);

  // render BannerBody conditionally when movieState arrive
  const BannerBody = () => {
    return (
      <section
        className={classes.banner}
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movieState[randomIndex].backdrop_path}")`,
        }}
      >
        <Container>
          <h1>{movieState[randomIndex].name}</h1>
          <div>
            <button>Play</button>
            <button>My List</button>
          </div>
          <p>{movieState[randomIndex].overview}</p>
        </Container>
      </section>
    );
  };

  return <>{movieState && <BannerBody />}</>;
};

export default Banner;
