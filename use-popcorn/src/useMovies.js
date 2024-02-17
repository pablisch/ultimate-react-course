import { useEffect, useState } from "react";

const apiKey = 'b028d269';

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    callback?.();
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

    fetchMovies();

    return () => {
      controller.abort();
    }
  }, [query]);

  return {movies, isLoading, error}
}