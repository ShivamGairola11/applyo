import { MovieSummary } from "@/types/movie";
import Image from "next/image";

interface MovieCardProps {
  movie: MovieSummary;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { Title, Year, Type, Poster } = movie;

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition-all">
      <div className="w-full h-72 bg-gray-100 rounded overflow-hidden relative">
        <Image
          src={Poster !== "N/A" ? Poster : "https://via.placeholder.com/300x450?text=No+Image"}
          alt={Title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold line-clamp-2">{Title}</h3>
        <p className="text-sm text-gray-600">{Type} | {Year}</p>
      </div>
    </div>
  );
}
