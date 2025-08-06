export default function MovieSkeleton() {
  return (
    <div className="border rounded-lg p-4 shadow animate-pulse">
      <div className="w-full h-72 bg-gray-200 rounded"></div>
      <div className="mt-4 h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  );
}
