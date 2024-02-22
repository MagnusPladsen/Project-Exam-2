import Skeleton from "react-loading-skeleton";
import ImageSlider from "../imageSlider/ImageSlider.component";
import { Venue } from "../../types/types";

function VenueImage({
  venue,
  isLoading,
}: {
  venue: Venue | undefined;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading || !venue ? (
        <Skeleton width={"100%"} height={600} />
      ) : venue.media.length > 0 ? (
        <ImageSlider
          images={venue.media}
          className="lg:rounded"
          imageClassName="lg:rounded"
        />
      ) : (
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1255/image-not-found.svg"
          alt="Venue"
          className="max-h-[600px] lg:max-h-[800px] w-full border bg-primary-light rounded"
        />
      )}
    </>
  );
}

export default VenueImage;
