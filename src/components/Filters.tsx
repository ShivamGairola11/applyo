"use client";

import { useState, useEffect } from "react";

interface FiltersProps {
  onFilterChange: (type: string, year: string) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [yearError, setYearError] = useState("");

  useEffect(() => {
    onFilterChange(type, year);
  }, [type, year]);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d{0,4}$/.test(val)) {
      setYear(val);
      setYearError("");
    }
  };

  return (
    <div className="flex flex-row justify-center md:justify-center lg:flex-wrap items-start gap-4 w-full md:w-auto">
      <div className="flex flex-col">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#b3063a] transition cursor-pointer"
        >
          <option value="">🎬 All Types</option>
          <option value="movie">🎞️ Movie</option>
          <option value="series">📺 Series</option>
        </select>
      </div>

      <div className="flex flex-col">
        <input
          type="text"
          value={year}
          onChange={handleYearChange}
          placeholder="📅 Year"
          maxLength={4}
          className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-md shadow-sm w-28 focus:outline-none focus:ring-2 focus:ring-[#b3063a] transition"
        />
        {yearError && (
          <span className="text-red-500 text-xs mt-1">{yearError}</span>
        )}
      </div>
    </div>
  );
}
