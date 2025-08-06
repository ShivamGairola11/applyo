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

  // 🔁 Loading UI with spinner
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
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm " onClick={onClose} />
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="relative w-full max-w-5xl bg-black rounded-lg overflow-hidden shadow-xl flex flex-col md:flex-row border border-gray-700 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white text-2xl z-10 hover:text-red-500 transition cursor-pointer"
          >
            ✕
          </button>

          {/* 🎞 Poster with overlay */}
          <div className="relative w-full md:w-2/3 h-64 md:h-auto">
            <Image
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/500x750?text=No+Image"
              }
              alt={movie.Title}
              fill
              className="object-cover opacity-70"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* 📄 Content */}
          <div className="md:w-1/2 p-6 text-white space-y-3 overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              {movie.Title}{" "}
              <span className="text-gray-400">({movie.Year})</span>
            </h2>
            <p className="text-sm text-gray-300 italic">{movie.Type?.toUpperCase()}</p>
            <p><strong>🎬 Genre:</strong> {movie.Genre}</p>
            <p><strong>🎥 Director:</strong> {movie.Director}</p>
            <p><strong>⭐ IMDb Rating:</strong> {movie.imdbRating}</p>
            <p><strong>⏱ Runtime:</strong> {movie.Runtime}</p>
            <p><strong>🗣 Language:</strong> {movie.Language}</p>
            <p><strong>📅 Released:</strong> {movie.Released}</p>
            <p><strong>🎭 Actors:</strong> {movie.Actors}</p>
            <p><strong>📝 Plot:</strong> {movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
