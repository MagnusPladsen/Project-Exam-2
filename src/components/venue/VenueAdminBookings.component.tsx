import { useState, useEffect } from "react";
import { Venue, Booking } from "../../types/types";
import PrimaryButton from "../buttons/PrimaryButton.component";
import H2 from "../common/H2.component";
import formatDate from "../../formatters/formatToDate";

function VenueAdminBookings({
  loggedInUserIsOwner,
  venue,
}: {
  loggedInUserIsOwner: boolean;
  venue: Venue | undefined;
}) {
  const [showBookings, setShowBookings] = useState<boolean>(false);
  const [bookingsStepper, setBookingsStepper] = useState(5);
  const [bookingsToShow, setBookingsToShow] = useState<Booking[]>();
  const showMoreBookings = () => {
    setBookingsStepper((prev) => prev + prev);
  };

  useEffect(() => {
    if (venue && venue.bookings.length > 0) {
      setBookingsToShow(venue.bookings.slice(0, bookingsStepper));
    }
  }, [bookingsStepper, venue]);

  return (
    <>
      {loggedInUserIsOwner && (
        <div className="flex flex-col gap-2 border border-primary rounded my-2 lg:mx-0 mx-[5vw] p-4 bg-primary-light">
          <H2 className="!mx-auto text-primary text-center !font-bold max-w-[80%] mb-4">
            Bookings
          </H2>
          {!showBookings && (
            <PrimaryButton
              onClick={() => setShowBookings(true)}
              className="w-fit mx-auto"
            >
              Show bookings
            </PrimaryButton>
          )}

          {showBookings && (
            <div className="">
              {venue && venue.bookings.length === 0 ? (
                <p>No bookings yet...</p>
              ) : (
                <div className="flex flex-col gap-10 lg:p-10">
                  {bookingsToShow &&
                    bookingsToShow.map((booking) => (
                      <div
                        key={booking.id}
                        className="flex flex-col lg:flex-row justify-between gap-2 lg:gap-10 lg:w-fit lg.mx-auto "
                      >
                        <div className="flex gap-2 lg:flex-col">
                          <p className="font-bold">
                            {booking.created !== booking.updated
                              ? "Updated:"
                              : "Created:"}
                          </p>
                          <p>
                            {booking.created !== booking.updated
                              ? formatDate(booking.updated)
                              : formatDate(booking.created)}
                          </p>
                        </div>

                        <div className="flex gap-2 lg:flex-col">
                          <p className="font-bold">Dates:</p>
                          <p>
                            {formatDate(booking.dateFrom)} -{" "}
                            {formatDate(booking.dateTo)}
                          </p>
                        </div>

                        <div className="flex gap-2 lg:flex-col">
                          <p className="font-bold">Guest amount:</p>
                          <p>{booking.guests}</p>
                        </div>
                      </div>
                    ))}
                  <p className="text-xs text-gray-400 text-center">
                    Showing {bookingsToShow!.length} of {venue!.bookings.length} bookings.
                  </p>
                  {bookingsToShow &&
                    bookingsToShow.length < venue!.bookings.length && (
                      <PrimaryButton onClick={showMoreBookings}>
                        Show more
                      </PrimaryButton>
                    )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default VenueAdminBookings;
