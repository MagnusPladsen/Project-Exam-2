import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ArrowIcon from "../components/icons/ArrowIcon.component";
import BreakfastIcon from "../components/icons/BreakfastIcon.component";
import DropDownIcon from "../components/icons/DropDownIcon.component";
import ParkingIcon from "../components/icons/ParkingIcon.component";
import PetsIcon from "../components/icons/PetsIcon.component";
import ProfileIcon from "../components/icons/Profileicon.component";
import WifiIcon from "../components/icons/WifiIcon.component";
import ImageSlider from "../components/imageSlider/ImageSlider.component";
import HolidazeTooltip from "../components/tooltip/HolidazeTooltip.component";
import capitalizeFirstLetter from "../formatters/capitalizeFirstLetter";
import { useGetSingleVenueQuery } from "../services/api/holidazeApi";
import HolidazeDatePicker from "../components/HolidazeDatePicker/HolidazeDatePicker.component";
import formatBookingsForDatePicker from "../components/HolidazeDatePicker/formatters";
import { DayRange } from "react-modern-calendar-datepicker";
import useAuth from "../hooks/useAuth";
import VenueAccordion from "../components/venue/VenueAccordion.component";
import VenueFooter from "../components/venue/VenueFooter.component";
import H1 from "../components/common/H1.component";
import H2 from "../components/common/H2.component";

function SingleVenuePage() {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const { data: venue, error, isLoading } = useGetSingleVenueQuery(String(id));

  const [selectedDays, setSelectedDays] = useState<DayRange>({
    from: null,
    to: null,
  });
  const disabledDays = formatBookingsForDatePicker(venue?.bookings || []);

  console.log(venue, id);

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

      <HolidazeDatePicker
        value={selectedDays}
        onChange={setSelectedDays}
        disabledDays={disabledDays}
        inputLabel={"Check availability"}
      />

      {isLoggedIn ? (
        <H2>Create booking</H2>
      ) : (
        <Link to="/login">
          <H2 className="hover:text-primary hover:underline underline-offset-2">
            Log in to create a booking
          </H2>
        </Link>
      )}

      <VenueFooter venue={venue} isLoading={isLoading} />
    </article>
  );
}

export default SingleVenuePage;
