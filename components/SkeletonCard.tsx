// components/SkeletonCard.tsx

export default function SkeletonCard() {
  return (
    <div className="bg-card border border-border rounded-lg p-6 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-border rounded-lg" />
          <div>
            <div className="h-5 w-48 bg-border rounded mb-2" />
            <div className="h-4 w-32 bg-border rounded" />
          </div>
        </div>
        <div className="w-6 h-6 bg-border rounded" />
      </div>
      
      <div className="flex gap-2 mb-4">
        <div className="h-6 w-20 bg-border rounded-full" />
        <div className="h-6 w-16 bg-border rounded-full" />
      </div>
      
      <div className="flex gap-2">
        <div className="h-10 flex-1 bg-border rounded-lg" />
        <div className="h-10 flex-1 bg-border rounded-lg" />
      </div>
    </div>
  );
}
