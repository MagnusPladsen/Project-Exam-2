import { useEffect, useState } from "react";
import formatToEuro from "../formatters/formatToEuro";
import { useGetLatestVenuesQuery } from "../services/api/holidazeApi";
import { useOutletContext } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import LoadingSkeleton from "../components/skeletons/LoadingSkeleton";

function LandingPage() {
  const className = useOutletContext();

  const [latestVenues, setLatestVenues] = useState<Venue[]>([]);

  const { data: venues, error, isLoading } = useGetLatestVenuesQuery();

  function getLatestVenues() {
    setLatestVenues(venues || []);
  }

  useEffect(() => {
    getLatestVenues();
  }, [isLoading]);

  return (
    <div className={`${className} flex items-center `}>
      <h1 className="text-5xl font-logo underline underline-offset-4 text-red-500 text-center mb-10">
        Just do it!
      </h1>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-primary text-2xl">Latest Venues</h2>
        <div className="flex flex-col border w-[600px] bg-white">
          <div className="flex gap-4 w-full border-t border-x border-primary px-3 py-2 bg-primary text-white rounded-t rounded-x">
            <div className="w-[250px] truncate text-ellipsis font-bold">
              Name
            </div>
            <div className="w-[150px] truncate text-ellipsis font-bold">
              Description
            </div>
            <div className="w-[100px] truncate text-ellipsis font-bold">
              Rating
            </div>
            <div className="w-[150px] truncate text-ellipsis font-bold">
              Price
            </div>
          </div>
          {isLoading ? (
            <LoadingSkeleton number={5} />
          ) : (
            latestVenues.map((venue, index) => (
              <div
                className={`flex gap-4 w-full border-x border-x-primary px-3 py-2 ${
                  index !== 0 ? "border-t border-t-gray-300" : ""
                } ${
                  index === latestVenues.length - 1
                    ? "rounded-b border-b border-b-primary"
                    : ""
                }`}
                key={venue.id}
              >
                <div className="w-[250px] truncate text-ellipsis">
                  {venue.name}
                </div>
                <div className="w-[150px] truncate text-ellipsis">
                  {venue.description}
                </div>

                <div className="w-[100px] truncate text-ellipsis">
                  {venue.rating}/5
                </div>
                <div className="w-[150px] truncate text-ellipsis">
                  {formatToEuro(venue.price)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
