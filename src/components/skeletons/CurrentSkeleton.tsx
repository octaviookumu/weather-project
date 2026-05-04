import { Skeleton } from "../ui/skeleton";
import Card from "../cards/Card";

export default function CurrentSkeleton() {
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6 2xl:justify-between"
    >
      <div className="flex flex-col items-center gap-2">
        <Skeleton className="h-15 w-30" />
        <Skeleton className="size-14 rounded-full" />
        <Skeleton className="h-7 w-36" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-center text-xl">Local Time:</p>
        <Skeleton className="h-10 w-36" />
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels Like</p>
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </Card>
  );
}
