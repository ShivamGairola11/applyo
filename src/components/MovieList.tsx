import { MovieSummary } from "@/types/movie";

interface Props {
  movie: MovieSummary;
  onClick: () => void;
}

export default function MovieList({ movie, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-4 p-4 border border-gray-200 bg-white rounded-lg shadow-sm hover:shadow-md hover:border-indigo-500 transition cursor-pointer"
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
        alt={movie.Title}
        className="w-24 h-36 object-cover rounded-md"
      />
      <div>
        <h3 className="text-xl font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
          {movie.Title}
        </h3>
        <p className="text-gray-500">{movie.Year}</p>
        <p className="text-sm text-gray-400 italic capitalize">{movie.Type}</p>
      </div>
    </div>
  );
}
