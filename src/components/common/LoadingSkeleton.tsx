const LoadingSkeleton = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04]"
        >
          <div className="aspect-[2/3] animate-pulse bg-slate-800" />
          <div className="space-y-3 p-4">
            <div className="h-5 animate-pulse rounded-full bg-slate-800" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-slate-800" />
            <div className="h-12 animate-pulse rounded-2xl bg-slate-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
