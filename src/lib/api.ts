import { MovieDetail, MovieSummary } from "@/types/movie";

const API_BASE = "https://www.omdbapi.com/";
const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

if (!API_KEY) {
  throw new Error("OMDb API key is missing. Check your .env.local file.");
}

export async function fetchMovies(
  search: string,
  type?: string,
  year?: string,
  page: number = 1
): Promise<{
  Search: MovieSummary[];
  totalResults: string;
  Response: "true";
}> {
  const url = new URL(API_BASE);
  url.searchParams.set("apikey", API_KEY || "");
  url.searchParams.set("s", search);
  url.searchParams.set("page", page.toString());

  if (type) url.searchParams.set("type", type);
  if (year) url.searchParams.set("y", year);

  const res = await fetch(url.toString());
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No result found");
  }
  return data;
}

export async function fetchMoviesById(imdbID: string): Promise<MovieDetail> {
  const url = new URL(API_BASE);
  url.searchParams.set("apikey", API_KEY || "");
  url.searchParams.set("i", imdbID);
  url.searchParams.set("plot", "full");

  const res = await fetch(url.toString());
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Failed to fetch movie details");
  }
  return data;
}

export async function fetchMoviesByTitle(
  title: string,
  year?: string
): Promise<MovieDetail> {
  const url = new URL(API_BASE);
  url.searchParams.set("apikey", API_KEY || "");
  url.searchParams.set("t", title);
  if (year) url.searchParams.set("year", year);
  url.searchParams.set("plot", "full");

  const res = await fetch(url.toString());
  const data = await res.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return data;
}
