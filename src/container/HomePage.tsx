"use client";

import { useEffect, useState } from "react";
import { fetchMovies } from "@/lib/api";
import { MovieSummary } from "@/types/movie";
import SearchBar from "@/components/SearchBar";
import Filters from "@/components/Filters";
import MovieCard from "@/components/MovieCard";
import MovieList from "@/components/MovieList";
import MovieModal from "@/components/MovieModal";
import MovieSkeleton from "@/components/LoadingSkeleton";
import ErrorMessage from "@/components/Error";
import { FaListUl, FaThLarge } from "react-icons/fa";

export default function HomePage() {
  const [query, setQuery] = useState("Avengers");
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const getMovies = async () => {
    if (!query) return;
    setLoading(true);
    setError("");

    try {
      const data = await fetchMovies(query, type, year, page);
      setMovies(data.Search);
      setTotalResults(Number(data.totalResults));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, [query, type, year, page]);

  const totalPages = Math.ceil(totalResults / 10);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="relative bg-black text-white py-[8rem] text-center shadow-lg flex flex-col gap-4 items-center mb-8">
        <div
          className="absolute inset-0 w-full h-full 
      [background-image:radial-gradient(circle,rgba(161,161,161,0.3)_1px,transparent_1px)] 
      [background-size:16px_16px] 
      [background-position:center] "
        ></div>

        <h1 className="font-epilogue text-6xl font-extrabold drop-shadow-xl text-[#b3063a]">
          Movie Explorer
        </h1>
        <p className="font-onest text-2xl max-w-2xl mx-auto text-white font-medium ">
          One stop platform for all your favourite movie.
        </p>
      </div>

      <div className="relative ">
        <div className=" custom-container mx-auto px-4 py-10  ">
          <div className="bg-white rounded-xl  p-6 -mt-20 relative z-10 grid gap-6 md:grid-cols-3 md:items-end shadow-[0_0_20px_#b3063a]">
            {/* SearchBar */}
            <SearchBar
              onSearch={(q) => {
                setQuery(q);
                setPage(1);
              }}
            />

            {/* Filters */}
            <Filters
              onFilterChange={(newType, newYear) => {
                setType(newType);
                setYear(newYear);
                setPage(1);
              }}
            />

            {/* Toggle View */}
            <div className="flex items-center justify-between gap-3 md:justify-end">
              <span className="text-sm text-gray-500 font-medium">View:</span>

              <div className="relative inline-flex items-center h-10 w-20  shadow-inner bg-white">
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex items-center justify-center w-1/2 h-full transition-all ${
                    viewMode === "list"
                      ? "bg-black text-white"
                      : "text-gray-500"
                  } `}
                >
                  <FaListUl className="text-lg" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex items-center justify-center w-1/2 h-full transition-all ${
                    viewMode === "grid"
                      ? "bg-black text-white"
                      : "text-gray-500"
                  } `}
                >
                  <FaThLarge className="text-lg" />
                </button>
              </div>
            </div>
          </div>

          {/* Loading Skeletons */}
          {loading && (
            <div
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                  : "grid-cols-1"
              } gap-6 mt-8`}
            >
              {Array.from({ length: 6 }).map((_, idx) => (
                <MovieSkeleton key={idx} />
              ))}
            </div>
          )}

          {/* Error */}
          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => {
                setError("");
                getMovies();
              }}
            />
          )}

          {/* Movie Results */}
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            } mt-10`}
          >
            {!loading &&
              !error &&
              Array.isArray(movies) &&
              movies.map((movie) =>
                viewMode === "grid" ? (
                  <div className="bg-gradient-to-br from-sky-700 via-indigo-600 to-emerald-500 p-[2px] rounded-xl">
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={() => setSelectedMovieId(movie.imdbID)}
                    />
                  </div>
                ) : (
                  <MovieList
                    key={movie.imdbID}
                    movie={movie}
                    onClick={() => setSelectedMovieId(movie.imdbID)}
                  />
                )
              )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                Prev
              </button>
              <span className="text-sm font-medium">Page {page}</span>
              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedMovieId && (
        <MovieModal
          imdbID={selectedMovieId}
          onClose={() => setSelectedMovieId(null)}
        />
      )}
    </div>
  );
}
