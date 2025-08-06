// components/ErrorMessage.tsx

interface ErrorMessageProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="mt-6 bg-red-50 border border-red-300 text-red-700 p-4 rounded-md max-w-xl mx-auto text-center">
      <p className="mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Retry
      </button>
    </div>
  );
}
