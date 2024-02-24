import Skeleton from "react-loading-skeleton";
import { Venue } from "../../types/types";

function VenuePriceHeader({
  venue,
  isLoading,
}: {
  venue: Venue | undefined;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading || !venue ? (
        <Skeleton width={200} height={20} />
      ) : (
        <span className="bg-green-200 text-green-600 font-medium inline-flex items-center px-2.5 py-1 rounded gap-2">
          Price per night: <span className="font-bold">$ {venue.price}</span>
        </span>
      )}
    </>
  );
}

export default VenuePriceHeader;
