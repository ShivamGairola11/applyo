"use client";

import { MovieSummary } from "@/types/movie";

interface Props {
  movie: MovieSummary;
  onClick: () => void;
}

export default function MovieList({ movie, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 border-2 border-black bg-white rounded-2xl shadow-md hover:shadow-lg hover:border-[#b3063a] transition-all duration-200 cursor-pointer group"
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "/placeholderMovie.webp"
        }
        alt={movie.Title}
        className="w-full sm:w-24 h-48 sm:h-36 object-cover rounded-md"
      />
      <div className="flex flex-col justify-between text-center sm:text-left w-full">
        <h3 className="text-xl font-bold text-black group-hover:text-[#b3063a] mb-1 transition-colors duration-300">
          {movie.Title}
        </h3>
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">Year:</span> {movie.Year}
        </p>
        <p className="text-gray-700 text-sm capitalize">
          <span className="font-semibold">Type:</span> {movie.Type}
        </p>
        <p className="text-gray-400 text-xs mt-1">ID: {movie.imdbID}</p>
        <span className="mt-2 text-xs text-[#b3063a] font-medium underline">
          Tap to view details →
        </span>
      </div>
    </div>
  );
}
