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
          src="https://www.feednavigator.com/var/wrbm_gb_food_pharma/storage/images/_aliases/news_large/9/2/8/5/235829-6-eng-GB/Feed-Test-SIC-Feed-20142.jpg"
          alt="Venue"
          className="max-h-[600px] lg:max-h-[800px] w-full border rounded"
        />
      )}
    </>
  );
}

export default VenueImage;
