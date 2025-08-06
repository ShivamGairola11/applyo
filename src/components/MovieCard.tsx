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
      className="p-4 rounded-2xl bg-white/10 border-2 border-black backdrop-blur-md shadow-lg cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl group"
    >
      <div className="relative w-full h-72 bg-gray-200 rounded overflow-hidden">
        <Image
          src={Poster !== "N/A" ? Poster : "/placeholderMovie.webp"}
          alt={Title}
          fill
          className="object-cover group-hover:brightness-90 transition duration-300 rounded-2xl"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="mt-4 py-4">
        <h3 className="font-epilogue text-xl font-semibold text-black group-hover:text-[#b3063a] transition-colors line-clamp-2">
          {Title}
        </h3>

        <p className="font-onset text-lg text-gray-800 capitalize mt-2">
          {Type} | {Year}
        </p>
      </div>
    </div>
  );
}
