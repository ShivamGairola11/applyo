interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center bg-white border-2 border-black text-center rounded-2xl shadow-lg px-6 py-8 max-w-lg mx-auto">
      <div className="text-[#b3063a] text-2xl font-bold mb-2">Oops! Something went wrong.</div>
      <p className="text-gray-700 mb-4 text-sm">{message}</p>
      <button
        onClick={onRetry}
        className="bg-[#b3063a] hover:bg-black text-white font-medium px-5 py-2 rounded-full transition-colors duration-300 shadow-md"
      >
        Retry
      </button>
    </div>
  );
}
