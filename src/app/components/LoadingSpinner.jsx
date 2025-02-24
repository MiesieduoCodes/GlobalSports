export default function LoadingSpinner() {
    return (
      <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent rounded-full text-blue-500">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }