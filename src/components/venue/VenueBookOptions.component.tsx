import { DayRange } from "@sentisso/react-modern-calendar-datepicker";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import formatBookingsForDatePicker from "../../formatters/formatBookingsForDatePicker";
import formatNewBooking from "../../formatters/formatToApi/formatNewBooking";
import useAuth from "../../hooks/useAuth";
import { useCreateBookingMutation } from "../../services/api/holidazeApi";
import { Venue } from "../../types/types";
import HolidazeDatePicker from "../HolidazeDatePicker/HolidazeDatePicker.component";
import PrimaryButton from "../buttons/PrimaryButton.component";
import H2 from "../common/H2.component";
import H3 from "../common/H3.component";
import MinusIcon from "../icons/MinusIcon.component";
import PlusIcon from "../icons/PlusIcon.component";
import HolidazeTooltip from "../tooltip/HolidazeTooltip.component";

function VenueBookOptions({
  venue,
  isLoading,
}: {
  venue: Venue | undefined;
  isLoading: boolean;
}) {
  const { isLoggedIn, user } = useAuth();

  const [selectedDays, setSelectedDays] = useState<DayRange>({
    from: null,
    to: null,
  });
  const disabledDays = formatBookingsForDatePicker(venue?.bookings || []);
  const [bookingDone, setBookingDone] = useState(false);

  const [guests, setGuests] = useState<number>(1);

  function incrementGuests() {
    if (guests < venue!.maxGuests) {
      setGuests((prev) => prev + 1);
    }
  }

  function decrementGuests() {
    if (guests > 1) {
      setGuests((prev) => prev - 1);
    }
  }

  const [createBookig] = useCreateBookingMutation();

  const handleCreateBooking = async () => {
    try {
      if (!venue) return;
      const body = formatNewBooking(venue.id, selectedDays, guests);
      if (!body) return;
      await createBookig(body).unwrap();
      setBookingDone(true);
    } catch (err) {
      console.log(err);
    }
  };

  return isLoading ? (
    <Skeleton width={"100%"} height={600} />
  ) : (
    <AnimatePresence initial={false}>
      <div className="flex flex-col gap-4 mb-10 mt-5 lg:p-0 px-[5vw] z-1">
        {isLoggedIn ? (
          <>
            {bookingDone ? (
              <>
                <H2>Booking created!</H2>
                <Link to={`/profile/${user?.name}`}>
                  <PrimaryButton>See your bookings</PrimaryButton>
                </Link>
              </>
            ) : (
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
                      className="text-xs text-primary cursor-pointer hover:underline underline-offset-2 ml-4"
                    >
                      Change Date
                    </p>
                  </div>
                )}
                <div className="flex flex-col gap-2 ">
                  <H3 className="text-secondary text-sm">Guests:</H3>
                  <div className="flex gap-2 items-center">
                    <div className="cursor-pointer" onClick={decrementGuests}>
                      <MinusIcon />
                    </div>
                    <p className="">{guests}</p>
                    <div className="cursor-pointer" onClick={incrementGuests}>
                      <PlusIcon />
                    </div>
                    <p className="font-light text-xs ml-2">
                      Max. {venue?.maxGuests} guests
                    </p>
                  </div>
                </div>

                {!(selectedDays.to && selectedDays.from) && (
                  <HolidazeTooltip id="venue-booking" />
                )}
                <PrimaryButton
                  data-tooltip-id="venue-booking"
                  data-tooltip-content={`You need to select a date range to create a booking.`}
                  onClick={handleCreateBooking}
                  disabled={!(selectedDays.to && selectedDays.from)}
                >
                  Create booking
                </PrimaryButton>
              </>
            )}
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
  );
}

export default VenueBookOptions;
