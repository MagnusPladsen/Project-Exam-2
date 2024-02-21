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
import CreateVenueModal from "../components/modals/venue/CreateVenueModal.component";
import VenueCard from "../components/venue/VenueCard.component";
import useAuth from "../hooks/useAuth";
import {
  useGetProfileQuery,
  useUpdateVenueManagerStatusMutation
} from "../services/api/holidazeApi";
import { UpdateVenueManagerStatusRequest, Venue } from "../types/types";
import H3 from "../components/common/H3.component";

function ProfilePage() {
  const { name } = useParams();
  const { user } = useAuth();
  const { data, error, isLoading } = useGetProfileQuery(name!);

  const isProfileLoggedIn = !!user && ((name === user.name) ?? false);

  const [updateStatus] = useUpdateVenueManagerStatusMutation();

  const [userIsManager, setUserIsManager] = useState(
    data ? data.venueManager : false
  );

  const [venueManagerModalOpen, setVenueManagerModalOpen] = useState(false);
  const [createVenueModalOpen, setCreateVenueModalOpen] = useState(false);
  const [updateVenueModalOpen, setUpdateVenueModalOpen] = useState(false);
  const [venuesStepper, setVenuesStepper] = useState(5);

  const showMoreVenues = () => {
    setVenuesStepper((prev) => prev + prev);
  };

  const [venuesToShow, setVenuesToShow] = useState<Venue[]>([]);
  const [venueToUpdate, setVenueToUpdate] = useState<Venue | undefined>(
    undefined
  );

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
      return "Are you sure you want to unregister as a venue manager?";
    }
    return "Are you sure you want to register as a venue manager?";
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

  return (
    <>
      {data && !error && (
        <article className="pt-[50px] lg:pt-[80px] antialiased bg-gradient-to-b from-primary to-white h-full w-full pb-40 shadow-md">
          <div className="w-full lg:w-[900px] lg:px-4 mx-auto">
            <div className=" relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl lg:rounded-lg mt-20 lg:mt-24">
              <div className="lg:px-6">
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
                          userIsManager ? "!text-primary" : "!text-gray-300"
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
                  {isProfileLoggedIn && userIsManager && (
                    <div className="flex flex-col gap-4 w-full">
                      <PrimaryButton
                        onClick={() => setCreateVenueModalOpen(true)}
                        className="!mx-auto !mb-7"
                      >
                        Create venue
                      </PrimaryButton>
                    </div>
                  )}
                </div>
                {userIsManager && venuesToShow.length > 0 && (
                  <div className="mt-4 pt-4 pb-10 border-t border-blueGray-200 text-center w-full">
                    <H3
                        className={`!text-primary text-lg mt-4 font-medium  leading-normal mb-4 uppercase`}
                      >
                        {isProfileLoggedIn ? "Your venues" : "Venues"}
                      </H3>
                    <AnimatePresence initial={false}>
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
                        {venuesToShow?.map((venue) => (
                          <VenueCard
                            key={venue.id}
                            venue={venue}
                            className="!mx-auto"
                            profilePage
                            setVenueToUpdate={setVenueToUpdate}
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
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      )}

      <ConfirmModal
        text={toggleVenueManagerText()}
        open={venueManagerModalOpen}
        onCancel={() => setVenueManagerModalOpen(false)}
        onConfirm={() =>
          sendVenueManagerChange({ name: data!.name, status: !userIsManager })
        }
      />

      <CreateVenueModal
        setOpen={
          updateVenueModalOpen && venueToUpdate
            ? setUpdateVenueModalOpen
            : setCreateVenueModalOpen
        }
        open={createVenueModalOpen || updateVenueModalOpen}
        venue={venueToUpdate}
        updateMode={updateVenueModalOpen}
      />
    </>
  );
}

export default ProfilePage;
