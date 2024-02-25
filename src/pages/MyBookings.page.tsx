import { useEffect, useState } from "react";
import H1 from "../components/common/H1.component";
import H2 from "../components/common/H2.component";
import H3 from "../components/common/H3.component";
import DropDownIcon from "../components/icons/DropDownIcon.component";
import VenueCard from "../components/venue/VenueCard.component";
import formatDate from "../formatters/formatToDate";
import useAuth from "../hooks/useAuth";
import { Booking } from "../types/types";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";

function renderBooking(booking: Booking) {
  return (
    <div
      key={booking.id}
      className="flex flex-col gap-2 w-full items-center justify-center"
    >
      <H3 className="flex gap-2 items-center text-gray-400">
        <p>Booked </p>
        <p className="text-black font-bold">{formatDate(booking.dateFrom)}</p>
        <p>-</p>
        <p className="text-black font-bold">{formatDate(booking.dateTo)}</p>
      </H3>
      <VenueCard
        venue={booking.venue}
        className="!mx-auto"
        profileBookingPage
      />
    </div>
  );
}

function MyBookingsPage() {
  const { name } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isProfileSameAsLoggedIn = !!user && name === user.name;

  const [showUpcoming, setShowUpcoming] = useState(true);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    if (!!user && !isProfileSameAsLoggedIn) {
      navigate("/404");
    }
  }, [user, isProfileSameAsLoggedIn, navigate]);

  return (
    <section className="min-h-[100vh] pt-[80px] lg:pt-[120px] mx-auto pb-16 lg:px-6">
      <div className="mx-auto lg:max-w-screen-sm text-center mb-8 flex flex-col w-[90vw] lg:min-w-[900px] lg:w-[900px]">
        <H1 className="!mb-10">My bookings</H1>
        <div
          className="flex gap-5 group hover:!text-primary hover:underline underline-offset-2 transition-all justify-center items-center cursor-pointer mb-5"
          onClick={() => setShowUpcoming((prev) => !prev)}
        >
          <H2 className="!text-lg group-hover:!text-primary ">Upcoming</H2>
          <motion.div animate={{ rotate: showUpcoming ? 0 : 90 }} className="">
            <DropDownIcon className="transition-all" />
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.1 }}
            className="flex-col mb-20 grid gap-8 lg:grid-cols-2 xl:grid-cols-3"
          >
            {user &&
              showUpcoming &&
              user.bookings?.map(
                (booking) =>
                  new Date(booking.dateTo) > new Date() &&
                  renderBooking(booking)
              )}
          </motion.div>
        </AnimatePresence>
        <div
          className="flex gap-5 group hover:!text-primary hover:underline underline-offset-2 transition-all justify-center items-center cursor-pointer mb-5"
          onClick={() => setShowPast((prev) => !prev)}
        >
          <H2 className="!text-lg group-hover:!text-primary ">Past</H2>
          <motion.div animate={{ rotate: showPast ? 0 : 90 }} className="">
            <DropDownIcon className="transition-all" />
          </motion.div>
        </div>
        <AnimatePresence initial={false}>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.1 }}
            className="flex-col mb-20 grid gap-8 lg:grid-cols-2 xl:grid-cols-3"
          >
            {user &&
              showPast &&
              user.bookings?.map(
                (booking) =>
                  new Date(booking.dateTo) < new Date() &&
                  renderBooking(booking)
              )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default MyBookingsPage;
