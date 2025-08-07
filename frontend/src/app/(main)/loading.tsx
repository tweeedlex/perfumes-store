import { Skeleton } from "@/shared/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-screen">
      <aside className="w-1/5 bg-gray-100 p-4 flex flex-col space-y-4 max-md:hidden">
        <Skeleton className="h-8 w-full rounded" />
        <Skeleton className="h-8 w-full rounded" />
        <Skeleton className="h-8 w-full rounded" />
      </aside>
      <main className="flex-1 p-6 flex flex-wrap gap-6">
        { Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        )) }
      </main>
    </div>
  )
}