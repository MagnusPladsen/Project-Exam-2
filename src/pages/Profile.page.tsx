import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton.component";
import H1 from "../components/common/H1.component";
import H2 from "../components/common/H2.component";
import Toggle from "../components/forms/Toggle.component";
import ProfileIcon from "../components/icons/Profileicon.component";
import ConfirmModal from "../components/modals/ConfirmModal.component";
import VenueModal from "../components/modals/venue/VenueModal.component";
import VenueCard from "../components/venue/VenueCard.component";
import useAuth from "../hooks/useAuth";
import {
  useDeleteVenueMutation,
  useGetProfileQuery,
  useUpdateVenueManagerStatusMutation,
} from "../services/api/holidazeApi";
import { UpdateVenueManagerStatusRequest, Venue } from "../types/types";
import H3 from "../components/common/H3.component";
import formatDate from "../formatters/formatToDate";

function ProfilePage() {
  const { name } = useParams();
  const { user } = useAuth();
  const { data, error, isLoading } = useGetProfileQuery(name!);

  const isProfileLoggedIn = !!user && (name === user.name ?? false);

  const [updateStatus] = useUpdateVenueManagerStatusMutation();
  const [deleteVenue] = useDeleteVenueMutation();

  const [userIsManager, setUserIsManager] = useState(
    data ? data.venueManager : false
  );

  const [venueManagerModalOpen, setVenueManagerModalOpen] = useState(false);
  const [VenueModalOpen, setVenueModalOpen] = useState(false);
  const [updateVenueModalOpen, setUpdateVenueModalOpen] = useState(false);
  const [venuesStepper, setVenuesStepper] = useState(5);
  const [venuesToShow, setVenuesToShow] = useState<Venue[]>([]);
  const [venueToUpdate, setVenueToUpdate] = useState<Venue | undefined>(
    undefined
  );
  const [deleteVenueActive, setDeleteVenueActive] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<Venue | undefined>(
    undefined
  );
  const [showVenues, setShowVenues] = useState<boolean>(true);

  const showMoreVenues = () => {
    setVenuesStepper((prev) => prev + prev);
  };

  const toggleVenueManager = () => {
    setVenueManagerModalOpen(true);
  };

  const sendVenueManagerChange = async (
    body: UpdateVenueManagerStatusRequest
  ) => {
    try {
      const res = await updateStatus(body).unwrap();
      setUserIsManager(res.venueManager);
      setVenueManagerModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleVenueManagerText = () => {
    if (userIsManager) {
      return "Are you sure you want to UNREGISTER as a venue manager?";
    }
    return "Are you sure you want to REGISTER as a venue manager?";
  };

  useEffect(() => {
    if (data) {
      setUserIsManager(data.venueManager);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      setVenuesToShow(data.venues!.slice(0, venuesStepper));
    }
  }, [venuesStepper, data]);

  useEffect(() => {
    if (venueToUpdate) {
      setUpdateVenueModalOpen(true);
    }
  }, [venueToUpdate]);

  useEffect(() => {
    if (venueToDelete) {
      setDeleteVenueActive(true);
    }
  }, [venueToDelete]);

  return (
    <>
      {data && !error && (
        <article className="pt-[50px] lg:pt-[80px] antialiased bg-gradient-to-b from-primary to-white h-full w-full pb-40 shadow-md">
          <div className="w-full lg:w-[900px] lg:px-4 mx-auto">
            <div className=" relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl lg:rounded-lg mt-20 lg:mt-24">
              <div className=" mb-10">
                <div className="flex flex-wrap justify-center">
                  <div className="px-4 flex justify-center">
                    <div className="relative">
                      {isLoading ? (
                        <Skeleton circle width={28} height={28} />
                      ) : (
                        <>
                          {data.avatar ? (
                            <img
                              src={data.avatar}
                              alt="Profile picture"
                              className="shadow-xl rounded-full align-middle absolute -my-16 left-1/2 transform -translate-x-1/2 max-w-[150px] h-[150px] border border-white object-cover"
                            />
                          ) : (
                            <ProfileIcon className="shadow-xl rounded-full align-middle absolute -my-16 left-1/2 transform -translate-x-1/2 max-w-[150px] h-[150px] border border-white object-cover bg-white" />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center mt-28 flex flex-col gap-4">
                  <H1 className="!mb-2">{data.name}</H1>

                  <div className="flex gap-2 w-fit mx-auto">
                    {isProfileLoggedIn ? (
                      <H2
                        className={`${
                          userIsManager ? "!text-primary" : "!text-gray-400"
                        } text-xs  leading-normal mt-1 uppercase`}
                      >
                        Venue Manager
                      </H2>
                    ) : (
                      <H2
                        className={`!text-primary text-xs  leading-normal mb-4 uppercase`}
                      >
                        {data.venueManager ? "Venue Manager" : "Venue Tenant"}
                      </H2>
                    )}

                    {isProfileLoggedIn && (
                      <Toggle
                        onChange={toggleVenueManager}
                        value={userIsManager!}
                      />
                    )}
                  </div>
                  <div className="flex gap-10 w-fit mx-auto mb-6">
                    <div className="text-xs flex flex-col gap-2">
                      <p>{isProfileLoggedIn ? "Your bookings" : "Bookings"}</p>
                      <p className="font-bold text-2xl">
                        {data._count?.bookings}
                      </p>
                    </div>
                    {userIsManager && (
                      <div className="text-xs flex flex-col gap-2">
                        <p>{isProfileLoggedIn ? "Your venues" : "Venues"}</p>
                        <p className="font-bold text-2xl">
                          {data._count?.venues}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {userIsManager && venuesToShow.length > 0 && (
                  <div className="mt-4 pb-10 border-t border-blueGray-200 text-center w-full">
                    {isProfileLoggedIn ? (
                      <div className="w-full mb-8 flex gap-5 items-center justify-between">
                        <H3
                          onClick={() => setShowVenues(false)}
                          className={`${
                            !showVenues
                              ? "!text-primary bg-primary-light !border-primary"
                              : "!text-gray-400 !border-white"
                          } text-lg  font-medium  leading-normal mb-4 uppercase w-full rounded-r-lg rounded-t-none py-5 border border-t-0 border-l-0 cursor-pointer `}
                        >
                          Your bookings
                        </H3>{" "}
                        <H3
                          onClick={() => setShowVenues(true)}
                          className={`${
                            showVenues
                              ? "!text-primary bg-primary-light !border-primary"
                              : "!text-gray-400 !border-white"
                          } text-lg font-medium leading-normal mb-4 uppercase w-full  rounded-l-lg rounded-t-none py-5 border border-t-0 border-r-0 cursor-pointer`}
                        >
                          Your venues
                        </H3>
                      </div>
                    ) : (
                      <H3
                        className={`!text-primary text-lg mt-4 font-medium leading-normal mb-4 uppercase`}
                      >
                        Venues
                      </H3>
                    )}

                    <AnimatePresence initial={false}>
                      {showVenues ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                          }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex text-left flex-col gap-4 lg:max-w-[500px] mx-auto"
                        >
                          <div className="flex flex-col gap-4 w-full">
                            <PrimaryButton
                              onClick={() => setVenueModalOpen(true)}
                              className="!mx-auto !mb-7"
                            >
                              Create venue
                            </PrimaryButton>
                          </div>
                          {venuesToShow?.map((venue) => (
                            <VenueCard
                              key={venue.id}
                              venue={venue}
                              className="!mx-auto"
                              profilePage
                              setVenueToUpdate={setVenueToUpdate}
                              setVenueToDelete={setVenueToDelete}
                            />
                          ))}
                          {data.venues!.length !== venuesToShow.length && (
                            <PrimaryButton
                              className="mx-auto"
                              onClick={showMoreVenues}
                            >
                              See more
                            </PrimaryButton>
                          )}
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{
                            opacity: 1,
                            height: "auto",
                          }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex text-left flex-col gap-4 lg:max-w-[500px] mx-auto"
                        >
                          <h4 className="text-center text-lg font-medium">
                            Upcoming
                          </h4>
                          {data.bookings?.map((booking) => (
                            <div
                              key={booking.id}
                              className="flex flex-col gap-4 w-full items-center justify-center"
                            >
                              <h5 className="flex gap-1 items-center text-xs text-gray-400">
                                <p>Booked from</p>
                                <p className="text-black font-bold">
                                  {formatDate(booking.dateFrom)}
                                </p>
                                <p className="text-xs text-gray-400">To:</p>{" "}
                                <p className="text-black font-bold">
                                  {formatDate(booking.dateTo)}
                                </p>
                              </h5>
                              <VenueCard
                                venue={booking.venue}
                                className="!mx-auto"
                                profileBookingPage
                              />
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      )}

      <ConfirmModal
        text={
          deleteVenueActive
            ? "Are you sure you want to delete this venue? This action cannot be undone!"
            : toggleVenueManagerText()
        }
        open={deleteVenueActive || venueManagerModalOpen}
        onCancel={() =>
          deleteVenueActive
            ? setDeleteVenueActive(false)
            : setVenueManagerModalOpen(false)
        }
        onConfirm={() =>
          deleteVenueActive
            ? deleteVenue(venueToDelete!.id)
            : sendVenueManagerChange({
                name: data!.name,
                status: !userIsManager,
              })
        }
      />

      <VenueModal
        setOpen={
          updateVenueModalOpen && venueToUpdate
            ? setUpdateVenueModalOpen
            : setVenueModalOpen
        }
        open={VenueModalOpen || updateVenueModalOpen}
        venue={venueToUpdate}
        updateMode={updateVenueModalOpen}
      />
    </>
  );
}

export default ProfilePage;
