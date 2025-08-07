"use client";

import { useEffect, useState } from "react";
import { fetchMoviesById } from "@/lib/api";
import { MovieDetail } from "@/types/movie";
import Image from "next/image";

interface MovieModalProps {
  imdbID: string;
  onClose: () => void;
}

export default function MovieModal({ imdbID, onClose }: MovieModalProps) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const data = await fetchMoviesById(imdbID);
        setMovie(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovie();
  }, [imdbID]);

  // 🔁 Loading UI
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-white text-lg font-medium">Loading</p>
        </div>
      </div>
    );
  }

  if (!movie) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-0" />
      <div
        className="relative z-10 w-full max-w-5xl bg-black rounded-xl overflow-hidden border border-gray-700 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-2xl z-10 hover:text-red-500 transition cursor-pointer"
        >
          ✕
        </button>

        {/* Poster */}
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src={
              movie.Poster !== "N/A"
                ? movie.Poster
                : "/placeholderMovie.webp"
            }
            alt={movie.Title}
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-6 text-white space-y-3 overflow-y-auto">
          <h2 className="text-2xl md:text-3xl font-bold">
            {movie.Title}{" "}
            <span className="text-gray-400">({movie.Year})</span>
          </h2>

          <p className="text-sm text-gray-300 italic mb-2">{movie.Type?.toUpperCase()}</p>

          <div className="space-y-1 text-sm">
            <p className="text-white"><span className="text-gray-400">Genre:</span> {movie.Genre}</p>
            <p className="text-white "><span className="text-gray-400">Director:</span> {movie.Director}</p>
            <p className="text-white "><span className="text-gray-400">IMDb Rating:</span> {movie.imdbRating}</p>
            <p className="text-white "><span className="text-gray-400">Runtime:</span> {movie.Runtime}</p>
            <p className="text-white "><span className="text-gray-400">Language:</span> {movie.Language}</p>
            <p className="text-white "><span className="text-gray-400">Released:</span> {movie.Released}</p>
            <p className="text-white "><span className="text-gray-400">Actors:</span> {movie.Actors}</p>
            <div className="max-h-40 overflow-y-auto pr-1 mt-2">
              <p className="text-white "><span className="text-gray-400">Plot:</span> {movie.Plot}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
