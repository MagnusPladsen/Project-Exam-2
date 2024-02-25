import Skeleton from "react-loading-skeleton";
import VenueCard from "../venue/VenueCard.component";

function renderSkeletons(amount: number) {
  const skeletons = [];
  for (let i = 0; i < amount; i++) {
    skeletons.push(
      <div className="flex flex-col gap-1 items-center">
        <Skeleton height={20} width={120} />
        <VenueCard isLoading key={`skeleton${i}`} />
      </div>
    );
  }
  return skeletons;
}

export default renderSkeletons;
