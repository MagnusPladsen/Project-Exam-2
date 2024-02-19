import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
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
import H3 from "../components/common/H3.component";

function ProfilePage() {
  const { name } = useParams();
  const { user, saveUser } = useAuth();
  const { data, error, isLoading } = useGetProfileQuery(name!);

  const loggedInProfile = name === user!.name;

  const [updateStatus] = useUpdateVenueManagerStatusMutation();

  const [venueManagerModalOpen, setVenueManagerModalOpen] = useState(false);
  const [userIsManager, setUserIsManager] = useState(
    data ? data.venueManager : false
  );

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
        <article className="pt-[50px] lg:pt-[80px] antialiased bg-gradient-to-b from-primary to-white h-full w-full">
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
                              className="shadow-xl rounded-full align-middle border-none absolute -my-16 left-1/2 transform -translate-x-1/2 max-w-[150px] h-[150px]"
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
                        Venue Tenant
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
                <div className="mt-2 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
                      </p>
                      <a href="#" className="font-normal text-pink-500">
                        Show more
                      </a>
                    </div>
                  </div>
                </div>
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
