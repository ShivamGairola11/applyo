"use client";

import { useEffect, useRef, useState } from "react";
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
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFeatured, setShowFeatured] = useState(true);
  const [featuredMovies, setFeaturedMovies] = useState<MovieSummary[]>([]);
  const [featuredLoading, setFeaturedLoading] = useState(false);
  const resultsRef = useRef<HTMLDivElement | null>(null);


  const getMovies = async () => {
    if (!query.trim()) return;
    if (year && year.length !== 4) return;
    setLoading(true);
    setError("");

    try {
      const data = await fetchMovies(query, type, year, page);
      setMovies(data.Search || []);
      setTotalResults(Number(data.totalResults) || 0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setMovies([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  const getFeatured = async () => {
    try {
      setFeaturedLoading(true);
      const data = await fetchMovies("Batman", "", "", 1);
      setFeaturedMovies(data.Search?.slice(0, 6) || []);
    } catch {
      setFeaturedMovies([]);
    } finally {
      setFeaturedLoading(false);
    }
  };

  useEffect(() => {
    getFeatured();
  }, []);

  useEffect(() => {
    if (query.trim()) {
      setShowFeatured(false);
      getMovies();
       requestAnimationFrame(() => {
  resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
});

    }
  }, [query, page]);

  useEffect(() => {
    if (query.trim()) {
      setPage(1);
      getMovies();
    }
  }, [type, year]);

  const totalPages = Math.ceil(totalResults / 10);

  const handleClearAll = () => {
    setQuery("");
    setType("");
    setYear("");
    setPage(1);
    setShowFeatured(true);
    setMovies([]);
    setTotalResults(0);
    setError("");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <div className="relative bg-black text-white py-[4rem] md:py-[8rem] text-center shadow-lg flex flex-col gap-4 items-center mb-8">
        <div className="absolute inset-0 w-full h-full [background-image:radial-gradient(circle,rgba(161,161,161,0.3)_1px,transparent_1px)] [background-size:16px_16px] [background-position:center]" />
        <h1 className="font-epilogue text-2xl md:text-6xl font-extrabold drop-shadow-xl text-[#b3063a]">
          Movie Explorer
        </h1>
        <p className="font-onest text-xl md:text-2xl max-w-2xl mx-auto text-white font-medium">
          One stop platform for all your favorite movie.
        </p>
      </div>


        <div className="custom-container mx-auto px-4 py-10 relative" ref={resultsRef}>
          {/* Search & Filters */}
          <div className=" bg-white rounded-xl p-6 -mt-20 relative z-10 grid gap-4 md:gap-8 lg:gap-8 md:grid-cols-1 lg:grid-cols-3 md:items-end shadow-[0_0_20px_#b3063a]">
            <SearchBar
              onSearch={(q) => {
                setQuery(q);
                setPage(1);
              }}
            />

            <Filters
              onFilterChange={(newType, newYear) => {
                setType(newType);
                setYear(newYear);
              }}
            />
            { query && (
            <div className="flex items-center justify-center gap-3 md:justify-center lg:justify-end">
              <span className="text-sm text-gray-500 font-medium">View:</span>
              <div className="relative inline-flex items-center h-10 w-20 shadow-inner bg-white">
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

              </div>
            </div>
            )}
            
          </div>

          {/* Clear All */}
         {(query || type || year.length === 4) && (
            <div className="text-right mt-4">
              <button
                onClick={handleClearAll}
                className="text-md text-[#b3063a] underline hover:opacity-75 font-semibold cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Start Searching Message */}
          {!query && (
            <p className="text-center text-gray-500 mt-10 text-lg font-semibold">
              Start searching for your favorite movies or series!
            </p>
          )}



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

          {/* Search Result Heading */}
          {!loading && !error && query && (
            <h3 className="mt-5 text-xl font-medium text-gray-700">
              Results for <span className="text-[#b3063a]">&quot;{query}&quot;</span>
              {type && (
                <span>
                  {" "}
                  | Type:{" "}
                  <span className="text-[#b3063a] font-semibold">{type}</span>
                </span>
              )}
              {year && (
                <span>
                  {" "}
                  | Year:{" "}
                  <span className="text-[#b3063a] font-semibold">{year}</span>
                </span>
              )}
            </h3>
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
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    onClick={() => setSelectedMovieId(movie.imdbID)}
                  />
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
          {totalPages > 1 && query && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="relative group px-5 py-2 rounded-md border text border-gray-300 bg-gradient-to-r from-[#fff] to-[#b3063a] text-white font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">← Prev</span>
              </button>

              <span className="text-sm font-semibold px-4 py-2 text-gray-800 bg-white rounded shadow-inner border border-[#b3063a]">
                Page {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={page === totalPages}
                className="relative group px-5 py-2 rounded-md border border-gray-300 bg-gradient-to-r from-[#b3063a] to-[#fff] text-white font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">Next →</span>
              </button>
            </div>
          )}

            {/* Featured Section */}
            {!query && (
            <>
              <h2 className="text-4xl font-bold  my-4 text-gray-800">
                Featured Movies
              </h2>

              {featuredLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <MovieSkeleton key={idx} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {featuredMovies.map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={() => setSelectedMovieId(movie.imdbID)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
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
