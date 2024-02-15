import { useEffect, useState } from 'react';
import StarRating from './StarRating';

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const apiKey = 'b028d269';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem('watched');
    return JSON.parse(storedValue)
  });

  const handleSelectMovie = (id) => {
    setSelectedId(selectedId => selectedId === id ? null : id);
  }

  const handleCloseSelectedMovie = () => {
    setSelectedId(null)
  }

  const handleAddWatchedMovie = (movie) => {
    setWatched(watched => [...watched, movie]);

    // localStorage.setItem('watched', JSON.stringify([...watched, movie]))
  }  

  const handleDeleteWatched = (id) => {
    console.log(id)
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))
  }, [watched])

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError('')
        const res = await fetch(`https://omdbapi.com/?apikey=${apiKey}&s=${query}`,
          { signal: controller.signal}
        );

        if (!res.ok) throw new Error("Something went wrong with fetching movies");
        
        const data = await res.json();
        if (data.Response === 'False') throw new Error(`No movies found when search for '${query}'`);
        // console.log(data);
        setMovies(data.Search);
        setError('');
      } catch (err) {
        console.error(err.message);

        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return; 
    }

    handleCloseSelectedMovie()
    fetchMovies();

    return () => {
      controller.abort();
    }
  }, [query]);


  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {(!isLoading && !error) && <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />}
          
        </Box>

        <Box>
          {selectedId ? <MovieDetail selectedId={selectedId} handleCloseSelectedMovie={handleCloseSelectedMovie} handleAddWatchedMovie={handleAddWatchedMovie} watched={watched} /> : <><WatchedSummary watched={watched} />
          <WatchedMoviesList watched={watched} handleDeleteWatched={handleDeleteWatched} /></>}
        </Box>
      </Main>
    </>
  );
}

function ErrorMessage({message}) {
  return <p className="error"><span>⛔️</span> {message}</p>
}

function Loader() {
  return <p className="loader">Loading...</p>
}

function Navbar({ children }) {
  return <nav className='nav-bar'>{children}</nav>;
}

function Logo() {
  return (
    <div className='logo'>
      <span role='img' aria-label='popcorn'>🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Search({ query, setQuery }) {
  
  useEffect(() => {
    const inputEl = document.querySelector('.search');
    inputEl.focus();
  }, [])

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Main({ children }) {
  return <main className='main'>{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, handleSelectMovie }) {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} handleSelectMovie={handleSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, handleSelectMovie }) {
  return (
    <li onClick={() => handleSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function MovieDetail({ selectedId, handleCloseSelectedMovie, handleAddWatchedMovie, watched }) {
  let thisMovie = {};
  // const isWatched = watched.filter(movie => movie.imdbID === selectedId).length > 0;
  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating
  // console.log(watchedUserRating)
  
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(isWatched ? thisMovie.userRating : '');


  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie;

  useEffect(() => {
    const callback = (e) => {
      if (e.code === 'Escape') {
        handleCloseSelectedMovie();
      } 
    }

    document.addEventListener('keydown', callback)

    return () => {
      document.removeEventListener('keydown', callback);
    }
  }, [handleCloseSelectedMovie])

  useEffect(() => {
    setIsLoading(true);
    const getMovieDetails = async () => {
      try {
        const res = await fetch(`https://omdbapi.com/?apikey=${apiKey}&i=${selectedId}`);

        if (!res.ok) throw new Error("Something went wrong with fetching movie details");
        
        const data = await res.json();
        if (data.Response === 'False') throw new Error(`No movies found`);
        console.log(data);
        setMovie(data)
      } catch (err) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails()
  }, [selectedId])

  useEffect(() => {
    if (!title) return
    document.title = title

    return () => {
      document.title = 'usePopcorn';
    }
  }, [title]);

  const handleAdd = () => {
    const movie = {
      title, imdbRating: Number(imdbRating), runtime: Number(runtime.split(' ')[0]), poster, imdbID: selectedId, userRating
    };
    handleAddWatchedMovie(movie);
    handleCloseSelectedMovie();
  }

  return (
    <div className="details" >
      {isLoading ? <Loader /> : <>
      <header>
        <button className='btn-back' onClick={handleCloseSelectedMovie}>&larr;</button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p> {released} &bull; {runtime}</p>
          <p>{genre} </p>
          <p><span>⭐️</span>{imdbRating} IMDB rating </p>
        </div>
      </header>
        <section>
        <div className="rating">
          {isWatched ? <p>{`You rated this movie ${watchedUserRating} ⭐️`}</p>
            : <>
        <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
        {userRating > 0 && <button className="btn-add" onClick={handleAdd} >
          + Add to watched list
                </button>}
                </>
        }
        </div>
        <p><em>{plot}</em></p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>

      </>}
    </div>
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{Math.round(avgImdbRating * 10) / 10}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{Math.round(avgUserRating * 10) / 10}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{Math.round(avgRuntime)} mins</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, handleDeleteWatched }) {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} handleDeleteWatched={handleDeleteWatched} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, handleDeleteWatched }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className='btn-delete' onClick={() => handleDeleteWatched(movie.imdbID)}>X</button>
      </div>
    </li>
  );
}
