"use client"
import { useState } from "react"
interface SearchProps{
    onSearch:(query:string)=>void;
}
export default function SearchBar({onSearch}:SearchProps){
    const [query, setQuery] = useState("");
    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        if(query.trim()) onSearch(query.trim());
    };
    return(
    <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full">
      <input
        type="text"
        placeholder="Search movies or series..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
    )
}