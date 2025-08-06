"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white text-center px-6">
      <div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          404 – So close... yet so lost.
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-8">
          You’ve wandered into the void. This page doesn’t exist – or maybe it ran away. 🤷‍♂️
        </p>
        <Link
          href="/"
          className="inline-block mt-4 px-6 py-3 text-sm md:text-base bg-white text-black font-semibold rounded hover:bg-gray-200 transition"
        >
          Take Me Home
        </Link>
      </div>
    </div>
  );
}
