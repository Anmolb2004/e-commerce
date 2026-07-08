export function ShopSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="skeleton h-4 w-24 rounded-full" />
      <div className="skeleton mt-4 h-12 w-64 rounded-2xl" />
      <div className="mt-8 flex items-center justify-between gap-4">
        <div className="skeleton h-11 w-full max-w-sm rounded-full" />
        <div className="skeleton h-11 w-40 rounded-full" />
      </div>
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-4">
        <div className="hidden space-y-4 lg:block">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-8 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:col-span-3 lg:gap-x-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i}>
              <div className="skeleton aspect-[4/5] rounded-2xl" />
              <div className="skeleton mt-4 h-3 w-16 rounded-full" />
              <div className="skeleton mt-2 h-4 w-36 rounded-full" />
              <div className="skeleton mt-2 h-4 w-20 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
