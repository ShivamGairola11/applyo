import { MovieSummary } from "@/types/movie";
import Image from "next/image";

interface MovieCardProps {
  movie: MovieSummary;
  onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const { Title, Year, Type, Poster } = movie;

  return (
    <div
      onClick={onClick}
      className="p-4 rounded-xl bg-white/10 border border-white/30 backdrop-blur-md shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl group"
    >
      <div className="relative w-full h-72 bg-gray-200 rounded overflow-hidden">
        <Image
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/300x450?text=No+Image"}
          alt={Title}
          fill
          className="object-cover group-hover:brightness-90 transition duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="mt-4">
        <h3 className="font-epilogue text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
          {Title}
        </h3>
        <p className="font-onset text-sm text-gray-300 capitalize ">{Type} | {Year}</p>
      </div>
    </div>
  );
}
