export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6 lg:px-8">
      <div className="skeleton h-4 w-72 rounded-full" />
      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="skeleton aspect-[4/5] rounded-[2rem]" />
          <div className="mt-4 flex gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton size-20 rounded-xl md:size-24" />
            ))}
          </div>
        </div>
        <div>
          <div className="skeleton h-3 w-28 rounded-full" />
          <div className="skeleton mt-4 h-12 w-4/5 rounded-2xl" />
          <div className="skeleton mt-3 h-5 w-56 rounded-full" />
          <div className="skeleton mt-6 h-9 w-32 rounded-xl" />
          <div className="mt-6 space-y-2.5">
            <div className="skeleton h-4 w-full rounded-full" />
            <div className="skeleton h-4 w-full rounded-full" />
            <div className="skeleton h-4 w-2/3 rounded-full" />
          </div>
          <div className="mt-8 flex gap-3">
            <div className="skeleton h-[52px] w-32 rounded-full" />
            <div className="skeleton h-[52px] flex-1 rounded-full" />
          </div>
          <div className="skeleton mt-8 h-24 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
