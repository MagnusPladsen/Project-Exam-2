import { useEffect, useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton.component";
import VenueCard from "../components/venue/VenueCard.component";
import { useGetVenuesQuery } from "../services/api/holidazeApi";
import ErrorMessage from "../components/messages/ErrorMessage.component";
import { Venue } from "../types/types";
import H1 from "../components/common/H1.component";

function VenuesPage() {
  const [latestVenues, setLatestVenues] = useState<Venue[]>([]);

  const [activeStep, setActiveStep] = useState<number>(0);

  const amountOfVenues = 6;

  const {
    data: venues,
    error,
    isLoading,
  } = useGetVenuesQuery({ limit: amountOfVenues, offset: activeStep });

  function getLatestVenues() {
    setLatestVenues(venues || []);
  }

  function incrementStep() {
    setActiveStep(activeStep + amountOfVenues);
    getMoreVenues();
  }

  function getMoreVenues() {
    if (venues) {
      setLatestVenues((prev) => [...prev, ...venues]);
    }
  }

  useEffect(() => {
    getLatestVenues();
  }, [isLoading]);

  return (
    <section className="pt-[80px] lg:pt-[120px] pb-8 mx-auto xl:max-w-screen-xl lg:pb-16 lg:px-6">
      <div className="mx-auto lg:max-w-screen-sm text-center lg:mb-16 mb-8">
        {error ? (
          <p>No venues where found... Please try again!</p>
        ) : (
          <H1>Venues</H1>
        )}
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Find venues posted by our community
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 mb-4 justify-center w-full">
        {isLoading && !error && (
          <>
            <VenueCard isLoading />
            <VenueCard isLoading />
            <VenueCard isLoading />
            <VenueCard isLoading />
            <VenueCard isLoading />
          </>
        )}
        {latestVenues.length &&
          !error &&
          latestVenues.map((venue, index) => (
            <VenueCard venue={venue} key={index} />
          ))}
        {error && <ErrorMessage />}
      </div>

      <div className="w-fit mx-auto my-10">
        <PrimaryButton onClick={incrementStep}>Load more</PrimaryButton>
      </div>
    </section>
  );
}

export default VenuesPage;
