import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { DayRange } from "@sentisso/react-modern-calendar-datepicker";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import HolidazeDatePicker from "../components/HolidazeDatePicker/HolidazeDatePicker.component";
import formatBookingsForDatePicker from "../components/HolidazeDatePicker/formatters";
import H1 from "../components/common/H1.component";
import H2 from "../components/common/H2.component";
import MinusIcon from "../components/icons/MinusIcon.component";
import PlusIcon from "../components/icons/PlusIcon.component";
import ImageSlider from "../components/imageSlider/ImageSlider.component";
import HolidazeTooltip from "../components/tooltip/HolidazeTooltip.component";
import VenueAccordion from "../components/venue/VenueAccordion.component";
import VenueFooter from "../components/venue/VenueFooter.component";
import capitalizeFirstLetter from "../formatters/capitalizeFirstLetter";
import useAuth from "../hooks/useAuth";
import { useGetSingleVenueQuery } from "../services/api/holidazeApi";
import H3 from "../components/common/H3.component";
import { AnimatePresence } from "framer-motion";
import PrimaryButton from "../components/buttons/PrimaryButton.component";

function SingleVenuePage() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const { data: venue, error, isLoading } = useGetSingleVenueQuery(String(id));

  const [selectedDays, setSelectedDays] = useState<DayRange>({
    from: null,
    to: null,
  });
  const disabledDays = formatBookingsForDatePicker(venue?.bookings || []);

  const [guests, setGuests] = useState<number>(1);

  function incrementGuests() {
    if (guests < venue.maxGuests) {
      setGuests((prev) => prev + 1);
    }
  }

  function decrementGuests() {
    if (guests > 1) {
      setGuests((prev) => prev - 1);
    }
  }

  return (
    <article className="py-8 lg:py-16 lg:px-6 w-[100vw] lg:w-[900px] mx-auto dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5">
      <H1>
        {isLoading || !venue ? (
          <Skeleton width={200} height={20} />
        ) : (
          capitalizeFirstLetter(venue.name)
        )}
      </H1>

      <div className="lg:p-0 px-[5vw] flex justify-between items-center  text-gray-500">
        {isLoading || !venue ? (
          <Skeleton width={50} height={20} />
        ) : (
          <span className="bg-green-200 text-green-600 font-medium inline-flex items-center px-2.5 py-1 rounded dark:bg-primary-light gap-2">
            Price: <span className="font-bold">$ {venue.price}</span>
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

      {isLoading || !venue ? (
        <Skeleton width={"100%"} height={600} />
      ) : venue.media.length > 0 ? (
        <ImageSlider
          images={venue.media}
          className="rounded"
          imageClassName="rounded"
        />
      ) : (
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1255/image-not-found.svg"
          alt="Venue"
          className="max-h-[600px] lg:max-h-[800px] w-full border bg-primary-light rounded"
        />
      )}

      <VenueAccordion venue={venue} isLoading={isLoading} />
      <AnimatePresence initial={false}>
        <div className="flex flex-col gap-4 mb-10 mt-5 lg:p-0 px-[5vw]">
          {isLoggedIn ? (
            <>
              <H2>Book venue</H2>
              {!(selectedDays.from && selectedDays.to) ? (
                <HolidazeDatePicker
                  value={selectedDays}
                  onChange={setSelectedDays}
                  disabledDays={disabledDays}
                  inputLabel="Dates"
                />
              ) : (
                <div className="flex gap-2 items-center">
                  <p>From:</p>
                  <p>
                    {selectedDays.from.day}.{selectedDays.from.month}
                  </p>
                  <p>-</p>
                  <p>
                    To: {selectedDays.to.day}.{selectedDays.to.month}
                  </p>
                  <p
                    onClick={() => setSelectedDays({ from: null, to: null })}
                    className="text-xs text-gray-300 cursor-pointer hover:underline underline-offset-2 hover:text-primary ml-4"
                  >
                    Change Date
                  </p>
                </div>
              )}
              <div className="flex flex-col gap-2 ">
                <H3 className="text-secondary text-sm">Guests:</H3>
                <div className="flex gap-2 items-center">
                  <div className="cursor-pointer" onClick={incrementGuests}>
                    <PlusIcon />
                  </div>
                  <p className="">{guests}</p>
                  <div className="cursor-pointer" onClick={decrementGuests}>
                    <MinusIcon />
                  </div>
                  <p className="font-light text-xs ml-2">
                    Max. {venue?.maxGuests} guests
                  </p>
                </div>
              </div>
              <PrimaryButton disabled={!(selectedDays.to && selectedDays.from)}>
                Book
              </PrimaryButton>
            </>
          ) : (
            <div className="flex flex-col lg:flex-row lg:items-end w-fit gap-5">
              <HolidazeDatePicker
                value={selectedDays}
                onChange={setSelectedDays}
                disabledDays={disabledDays}
                inputLabel="Check availability"
                renderFooter={() => (
                  <div className="flex items-center w-fit mx-auto mb-10">
                    <Link to="/login">
                      <PrimaryButton>Log in to create a booking</PrimaryButton>
                    </Link>
                  </div>
                )}
              />

              <div className="flex flex-col gap-2">
                <p className="text-xs text-gray-400 whitespace-nowrap">
                  To create a booking you need to login
                </p>
                <Link to="/login">
                  <PrimaryButton>Log in</PrimaryButton>
                </Link>
              </div>
            </div>
          )}
        </div>
      </AnimatePresence>

      <VenueFooter venue={venue} isLoading={isLoading} />
    </article>
  );
}

export default SingleVenuePage;
