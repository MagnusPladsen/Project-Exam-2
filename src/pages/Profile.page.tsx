import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link, useParams } from "react-router-dom";
import H1 from "../components/common/H1.component";
import H2 from "../components/common/H2.component";
import Toggle from "../components/forms/Toggle.component";
import ProfileIcon from "../components/icons/Profileicon.component";
import ConfirmModal from "../components/modals/ConfirmModal.component";
import useAuth from "../hooks/useAuth";
import {
  useGetProfileQuery,
  useUpdateVenueManagerStatusMutation,
} from "../services/api/holidazeApi";
import { UpdateVenueManagerStatusRequest } from "../types/types";
import PrimaryButton from "../components/buttons/PrimaryButton.component";
import { AnimatePresence, motion } from "framer-motion";
import H3 from "../components/common/H3.component";
import capitalizeFirstLetter from "../formatters/capitalizeFirstLetter";
import VenueCard from "../components/venue/VenueCard.component";

function ProfilePage() {
  const { name } = useParams();
  const { user, saveUser } = useAuth();
  const { data, error, isLoading } = useGetProfileQuery(name!);

  const loggedInProfile = name === user!.name;

  const [updateStatus] = useUpdateVenueManagerStatusMutation();

  const [userIsManager, setUserIsManager] = useState(
    data ? data.venueManager : false
  );

  const [venueManagerModalOpen, setVenueManagerModalOpen] = useState(false);
  const [openVenues, setOpenVenues] = useState(false);

  const toggleVenueManager = () => {
    setVenueManagerModalOpen(true);
    console.log("clicked");
  };

  const sendVenueManagerChange = async (
    body: UpdateVenueManagerStatusRequest
  ) => {
    try {
      const res = await updateStatus(body).unwrap();
      saveUser(res);
      setUserIsManager(!userIsManager);
      setVenueManagerModalOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleVenueManagerText = () => {
    if (userIsManager) {
      return "Are you sure you want to unregister as a venue manager? You will be asked to log in again for the changes to apply!";
    }
    return "Are you sure you want to register as a venue manager? You will be asked to log in again for the changes to apply!";
  };

  console.log(loggedInProfile);
  console.log(data);

  useEffect(() => {
    if (data) {
      setUserIsManager(data.venueManager);
    }
  }, [data]);

  return (
    <>
      {data && !error && (
        <article className="pt-[50px] lg:pt-[80px] antialiased bg-gradient-to-b from-primary to-white h-full w-full mb-40">
          <div className="w-full lg:w-[900px] px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-20 lg:mt-24">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      {isLoading ? (
                        <Skeleton circle width={28} height={28} />
                      ) : (
                        <>
                          {data.avatar ? (
                            <img
                              src={data.avatar}
                              alt="Profile picture"
                              className="shadow-xl rounded-full align-middle absolute -my-16 left-1/2 transform -translate-x-1/2 max-w-[150px] h-[150px] border border-white"
                            />
                          ) : (
                            <ProfileIcon className="shadow-xl rounded-full h-auto align-middle border-none absolute -my-16 left-1/2 transform -translate-x-1/2 !max-w-[150px]" />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center mt-28 flex flex-col gap-4">
                  <H1 className="!mb-2">{data.name}</H1>

                  <div className="flex gap-2 w-fit mx-auto">
                    {loggedInProfile ? (
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

                    {loggedInProfile && (
                      <Toggle
                        onChange={toggleVenueManager}
                        value={userIsManager!}
                      />
                    )}
                  </div>
                  <div className="flex gap-10 w-fit mx-auto mb-6">
                    <div className="text-xs flex flex-col gap-2">
                      <p> Bookings </p>
                      <p className="font-bold text-2xl">
                        {data._count?.bookings}
                      </p>
                    </div>
                    {userIsManager && (
                      <div className="text-xs flex flex-col gap-2">
                        <p>Venues</p>
                        <p className="font-bold text-2xl">
                          {data._count?.venues}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                {userIsManager && (
                  <div className="mt-2 py-10 border-t border-blueGray-200 text-center">
                    <PrimaryButton
                      className="mb-5"
                      onClick={() => setOpenVenues((prev) => !prev)}
                    >
                      {openVenues ? "Hide users venues" : "See users venues"}
                    </PrimaryButton>
                    <AnimatePresence initial={false}>
                      {openVenues && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-5 flex flex-col gap-4 lg:max-w-[500px] lg:mx-auto"
                        >
                       {/*    {data.venues?.map((venue) => (
                            <Link key={venue.id} to={`/venue/${venue.id}`}>
                              <div className="flex flex-col w-full items-center gap-2 bg-white rounded-lg border border-gray-200 shadow-md py-8">
                                <H3 className="font-bold underline underline-offset-2 ">
                                  {capitalizeFirstLetter(venue.name)}
                                </H3>
                                <p className="text-xs">
                                  {capitalizeFirstLetter(venue.description)}
                                </p>
                              </div>
                            </Link>
                          ))} */}
                          {data.venues?.map((venue) => (
                            <VenueCard key={venue.id} venue={venue!} />
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
        text={toggleVenueManagerText()}
        open={venueManagerModalOpen}
        onCancel={() => setVenueManagerModalOpen(false)}
        onConfirm={() =>
          sendVenueManagerChange({ name: data!.name, status: !userIsManager })
        }
      />
    </>
  );
}

export default ProfilePage;
