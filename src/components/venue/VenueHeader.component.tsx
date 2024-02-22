import Skeleton from "react-loading-skeleton";
import capitalizeFirstLetter from "../../formatters/capitalizeFirstLetter";
import { Venue } from "../../types/types";
import H1 from "../common/H1.component";

function VenueHeader({
  venue,
  isLoading,
}: {
  venue?: Venue;
  isLoading?: boolean;
}) {
  return (
    <H1 className="max-w-[90vw] mx-auto">
      {isLoading || !venue ? (
        <Skeleton width={200} height={20} />
      ) : (
        capitalizeFirstLetter(venue.name)
      )}
    </H1>
  );
}

export default VenueHeader;
