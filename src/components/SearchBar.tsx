"use client";

import { useState } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchProps) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Please enter a search term.");
      return;
    }
    setError("");
    onSearch(trimmed);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-xl mx-auto bg-white rounded-full shadow-md overflow-hidden focus-within:ring-2 focus-within:ring-[#b3063a] transition"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (error) setError("");
          }}
          placeholder="🔍 Search movies or series..."
          className="flex-1 px-5 py-3 text-gray-800 placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-[#b3063a] text-white px-6 py-3 font-medium hover:bg-[#b3063a] transition-colors font-epilogue"
        >
          Search
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
      )}
    </div>
  );
}
