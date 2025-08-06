"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar";
import { fetchMovies } from "@/lib/api";
import { MovieSummary } from "@/types/movie";
import MovieCard from "@/components/MovieCard";

export default function HomePage() {
  const [query, setQuery] = useState("Avengers");
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const data = await fetchMovies(query, undefined, undefined, page);
      setMovies(data.Search);
      setTotalResults(Number(data.totalResults));
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [query, page]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🎬 Movie Explorer</h1>

      <SearchBar
        onSearch={(q) => {
          setQuery(q);
          setPage(1);
        }}
      />

      {loading && <p className="mt-6 text-blue-600">Loading...</p>}
      {error && <p className="mt-6 text-red-600">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {!loading &&
          !error &&
          movies.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-sm">Page {page}</span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
