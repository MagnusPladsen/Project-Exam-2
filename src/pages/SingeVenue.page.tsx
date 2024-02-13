import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ArrowIcon from "../components/icons/ArrowIcon.component";
import LocationIcon from "../components/icons/LocationIcon.component";
import ProfileIcon from "../components/icons/Profileicon.component";
import HolidazeTooltip from "../components/tooltip/HolidazeTooltip.component";
import { useGetSingleVenueQuery } from "../services/api/holidazeApi";

function SingleVenuePage() {
  const { id } = useParams(); // Get the venue ID from URL parameter

  const { data: venue, error, isLoading } = useGetSingleVenueQuery(String(id));
  console.log(venue, id);
  
  return (
    <article className="p-6 w-[90vw] lg:w-full xl:max-w-lg xl:mx-auto bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        {isLoading || !venue ? (
          <Skeleton width={50} height={20} />
        ) : (
          <span className="bg-primary-light text-primary text-xs font-medium inline-flex items-center px-2.5 py-1 rounded dark:bg-primary-light dark:text-primary gap-2">
            <LocationIcon /> {venue.location.country}
          </span>
        )}

        <HolidazeTooltip id="venue-rating" />
        <span
          data-tooltip-id="venue-rating"
          data-tooltip-content={`This venue has gotten an average rating of ${venue?.rating} out of 5`}
          className="text-sm"
        >
          <StarRatings
            rating={isLoading || !venue ? 5 : venue.rating}
            numberOfStars={5}
            starRatedColor={"gold"}
            starDimension={"20px"}
            starSpacing={"0px"}
          />
        </span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white truncate text-ellipsis">
        {isLoading || !venue ? (
          <Skeleton width={200} height={20} />
        ) : (
          venue.name
        )}
      </h2>
      <p className="mb-5 h-[calc(1rem*3)] font-light text-gray-500 dark:text-gray-400 line-clamp-3">
        {isLoading || !venue ? (
          <Skeleton width={300} height={20} />
        ) : (
          venue.description
        )}
      </p>
      <div className="flex justify-between items-center">
        <Link
          className="cursor-pointer hover:underline underline-offset-2 hover:text-primary group transition-all"
          to={`/profile?name=${venue?.owner.name}`}
        >
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <Skeleton circle width={28} height={28} />
            ) : (
              <>
                {venue?.owner?.avatar ? (
                  <img
                    className="w-7 h-7 rounded-full group-hover:opacity-80 transition-all border-2 group-hover:border-primary border-white"
                    src={venue.owner.avatar}
                    alt={`${venue.owner.name}'s avatar`}
                  />
                ) : (
                  <ProfileIcon className="!mb-0 !w-7 !h-7" />
                )}
              </>
            )}

            <span className="font-medium dark:text-white ">
              {isLoading || !venue ? (
                <Skeleton width={100} height={20} />
              ) : (
                venue.owner.name
              )}
            </span>
          </div>
        </Link>
        <Link
          to={`/venues/${venue?.id}`}
          className="inline-flex items-center font-medium text-primary hover:underline"
        >
          See venue
          <ArrowIcon />
        </Link>
      </div>
    </article>
  );
}

export default SingleVenuePage;
