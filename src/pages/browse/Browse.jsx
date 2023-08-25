import React from "react";
import NavBar from "../../components/NavBar";
import Banner from "../../components/Banner";
import MovieList from "../../components/MovieList";

const theMovieDB = "https://api.themoviedb.org/3";
const API_KEY = "6ecbaab87951fbdafa9c8b6087d9eb83";
const requests = {
  fetchTrending: `${theMovieDB}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${theMovieDB}/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `${theMovieDB}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${theMovieDB}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${theMovieDB}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${theMovieDB}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${theMovieDB}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${theMovieDB}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

function Browse() {
  return (
    <div className="app">
      <NavBar />
      <Banner url={requests.fetchNetflixOriginals} />
      <MovieList
        url={requests.fetchNetflixOriginals}
        sectionName=""
        type="poster"
      />
      <MovieList url={requests.fetchTrending} sectionName="Xu Hướng" />
      <MovieList url={requests.fetchTopRated} sectionName="Xếp hạng cao" />
      <MovieList url={requests.fetchActionMovies} sectionName="Hành động" />
      <MovieList url={requests.fetchComedyMovies} sectionName="Phim hài" />
      <MovieList url={requests.fetchHorrorMovies} sectionName="Kinh dị" />
      <MovieList url={requests.fetchRomanceMovies} sectionName="Lãng mạn" />
      <MovieList
        url={requests.fetchDocumentaries}
        sectionName="Phim tài liệu"
      />
      <footer></footer>
    </div>
  );
}

export default Browse;
