import { useState, useEffect } from "react";
import {
  useGetLatestVenuesQuery,
  useGetVenuesQuery,
} from "../services/api/holidazeApi";
import VenueCard from "../components/listVenus/VenueCard";
import { useOutletContext } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";

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
    if (venues) alert("No more venues to load");
    if (!!venues) {
      setLatestVenues((prev) => [...prev, ...venues]);
    }
  }

  useEffect(() => {
    getLatestVenues();
  }, [isLoading]);

  return (
    <section>
      <div className="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
        <h1 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Venues
        </h1>
        <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
          Find venues posted by our community
        </p>
      </div>
      <div className="grid gap-8 lg:grid-cols-2 mb-4">
        {isLoading ? (
          <>
            <VenueCard isLoading />
            <VenueCard isLoading />
            <VenueCard isLoading />
            <VenueCard isLoading />
            <VenueCard isLoading />
          </>
        ) : (
          latestVenues.map((venue, index) => (
            <VenueCard venue={venue} key={index} />
          ))
        )}
      </div>
      <div className="w-fit mx-auto my-10">
        <PrimaryButton onClick={incrementStep}>Load more</PrimaryButton>
      </div>
    </section>
  );
}

export default VenuesPage;
