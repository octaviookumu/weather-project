import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function DailySkeleton() {
  return (
    <Card
      title="Daily Forecast"
      childrenClassName="flex flex-col gap-4 2xl:justify-between"
    >
      {/* instead of mapping over data, we can map through an array of 8 items to
      show 8 skeletons for the 8 days of the forecast */}
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="flex justify-between">
          <Skeleton className="h-8 w-9" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
          <Skeleton className="size-8" />
        </div>
      ))}
    </Card>
  );
}
