import { useEffect, useState } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton.component";
import VenueCard from "../components/venue/VenueCard.component";
import {
  useGetVenuesQuery,
  useLazyGetVenuesQuery,
} from "../services/api/holidazeApi";
import ErrorMessage from "../components/messages/ErrorMessage.component";
import { SortOrder, Venue } from "../types/types";
import H1 from "../components/common/H1.component";
import VenueSearchInput from "../components/searchInput/VenueSearchInput.component";
import Crossicon from "../components/icons/CrossIcon.component";
import { AnimatePresence, motion } from "framer-motion";

function VenuesPage() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [venuesToShow, setVenuesToShow] = useState<Venue[]>([]);
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Descending);
  const [amountOfVenues, setAmountOfVenues] = useState<number>(6);
  const [searchString, setSearchString] = useState<string>("");
  const [lastSearchString, setLastSearchString] = useState<string>("");

  const {
    data: venues,
    error,
    isLoading,
  } = useGetVenuesQuery({
    limit: amountOfVenues,
    offset: activeStep,
    sortOrder: sortOrder,
  });

  const [fetchVenues] = useLazyGetVenuesQuery();

  function getLatestVenues() {
    setVenuesToShow(venues ?? []);
  }

  function incrementStep() {
    setActiveStep((prev) => prev + amountOfVenues);
    fetchVenues({
      limit: amountOfVenues,
      offset: activeStep + amountOfVenues,
      sortOrder: sortOrder,
    })
      .unwrap()
      .then((data) => {
        setVenuesToShow((prev) => [...prev, ...data]);
      });
  }

  function sortSearchResults(sortOrder: SortOrder) {
    setVenuesToShow((prev) => {
      return [...prev].sort((a, b) => {
        if (sortOrder === SortOrder.Ascending) {
          return a.name.localeCompare(b.name);
        }
        return b.name.localeCompare(a.name);
      });
    });
  }

  function sortVenues(sortOrder: SortOrder) {
    setSortOrder(sortOrder);
    fetchVenues({
      limit: amountOfVenues,
      offset: activeStep,
      sortOrder: sortOrder,
    })
      .unwrap()
      .then((data) => {
        setVenuesToShow(data);
      });
  }

  function handleSort(sortOrder: SortOrder) {
    if (searchActive) {
      sortSearchResults(sortOrder);
    } else {
      sortVenues(sortOrder);
    }
  }

  function resetToLatestVenues() {
    setLastSearchString("");
    setSearchActive(false);
    setAmountOfVenues(6);
    setActiveStep(0);
    setSortOrder(SortOrder.Descending);
    getLatestVenues();
  }

  function searchVenues() {
    if (searchString.length > 0) {
      setSearchActive(true);
      setLastSearchString(searchString);
      setSortOrder(SortOrder.Descending);
      fetchVenues({ limit: 100, offset: 0, sortOrder: SortOrder.Descending })
        .unwrap()
        .then((data) => {
          const filteredVenues = data.filter((venue) =>
            venue.name.toLowerCase().includes(searchString.toLowerCase())
          );
          setVenuesToShow(filteredVenues);
        });
    } else {
      resetToLatestVenues();
    }
  }

  useEffect(() => {
    getLatestVenues();
  }, [isLoading]);

  return (
    <section className=" pt-[80px] lg:pt-[120px] mx-auto xl:max-w-screen-xl pb-16 lg:px-6">
      <div className="mx-auto lg:max-w-screen-sm text-center  mb-8 flex flex-col">
        {error ? (
          <p>No venues where found... Please try again!</p>
        ) : (
          <H1>Venues</H1>
        )}
        <p className="font-light text-gray-500 sm:text-xl mb-5">
          Find venues posted by our community
        </p>
        <VenueSearchInput
          setSearchString={setSearchString}
          searchString={searchString}
          sortOrder={sortOrder}
          searchVenues={searchVenues}
          handleSort={handleSort}
        />
        <AnimatePresence initial={false}>
          {searchActive && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => resetToLatestVenues()}
              className="flex gap-5 group hover:!text-red-500 items-center justify-center cursor-pointer mt-5"
            >
              <p className="text-gray-500 text-sm">
                Search results for: {lastSearchString}
              </p>
              <div className="lg:opacity-0 group-hover:opacity-100 flex gap-2 items-center">
                <p className="text-red-500 text-sm">Reset</p>
                <Crossicon className="text-red-500" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
        <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3 mb-4 justify-center w-full">
          {isLoading && !venues && (
            <>
              <VenueCard isLoading key="skeleton1" />
              <VenueCard isLoading key="skeleton2" />
              <VenueCard isLoading key="skeleton3" />
              <VenueCard isLoading key="skeleton4" />
              <VenueCard isLoading key="skeleton5" />
            </>
          )}
          {!!venuesToShow.length &&
            !error &&
            venuesToShow.map((venue) => (
              <VenueCard venue={venue} key={venue.id+"inside"} />
            ))}
          <ErrorMessage show={!!error} />
        </div>

        {!searchActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
            className="w-fit mx-auto my-10"
          >
            <PrimaryButton onClick={incrementStep}>Load more</PrimaryButton>
          </motion.div>
        )}
    </section>
  );
}

export default VenuesPage;
