import Card from "../cards/Card";
import { Skeleton } from "../ui/skeleton";

export default function AdditionalInfoSkeleton() {
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="flex flex-col gap-8"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex justify-between">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="size-6 rounded-full" />
          </div>
          <Skeleton className="size-6" />
        </div>
      ))}
    </Card>
  );
}
