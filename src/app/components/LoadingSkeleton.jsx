export default function LoadingSkeleton() {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/2 dark:bg-gray-700"></div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
          ))}
        </div>
      </div>
    );
  }