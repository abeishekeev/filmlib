const apiKey = '64e82c2a8cea7e35b78b3a4128e60406';
const baseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

// function to get list of genres from API

const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${apiKey}`;
    const urlToFetch = `${baseUrl}${genreRequestEndpoint}${requestParams}`;
    try{
      const response = await fetch(urlToFetch);
      if(response.ok){
        const jsonResponse = await response.json();
        const genres = jsonResponse.genres;
        return genres;
      }
    }catch(error){
     console.log(error);
    }
  };


const getMovies = async () => {
    const selectedGenre = getSelectedGenre();
    const movieListEndpoint = '/discover/movie';
    const request = `?api_key=${apiKey}&with_genres=${selectedGenre}`;
    const fetchUrl = `${baseUrl}${movieListEndpoint}${request}`;
    try {
        const response = await fetch(fetchUrl);
        if(response.ok){
            const responseJson = await response.json();
            const movies = responseJson.results;
            return movies;
        }

    } catch (error) {
        console.log(error)
    }
}


const getMovieInfo = async (movie) => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const request = `?api_key=${apiKey}`;
    const fetchUrl = `${baseUrl}${movieId}${request}`;
    try {
        const response = await fetch(fetchUrl);
        if(response.ok){
            const movieInfo = await response.json();
            return movieInfo;
        }

    } catch (error) {
        console.log(error)
    }
};


const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
      clearCurrentMovie();
    };
    const movies = await getMovies();
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);
  };



  getGenres().then(populateGenreDropdown);
  playBtn.onclick = showRandomMovie;