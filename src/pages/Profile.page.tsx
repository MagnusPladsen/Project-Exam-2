import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink, useParams } from "react-router-dom";
import H1 from "../components/common/H1.component";
import H2 from "../components/common/H2.component";
import H3 from "../components/common/H3.component";
import Toggle from "../components/forms/Toggle.component";
import EditIcon from "../components/icons/EditIcon.component";
import ProfileIcon from "../components/icons/Profileicon.component";
import ErrorMessage from "../components/messages/ErrorMessage.component";
import ConfirmModal from "../components/modals/ConfirmModal.component";
import UpdateImageModal from "../components/modals/profile/UpdateImageModal.component";
import useAuth from "../hooks/useAuth";
import {
  useGetProfileQuery,
  useUpdateVenueManagerStatusMutation,
} from "../services/api/holidazeApi";
import { UpdateVenueManagerStatusRequest } from "../types/types";
import PrimaryButton from "../components/buttons/PrimaryButton.component";
import SecondaryButton from "../components/buttons/SecondaryButton.component";

function ProfilePage() {
  const { name } = useParams();
  const { user } = useAuth();
  const { data, error, isLoading } = useGetProfileQuery(name!);

  const isProfileSameAsLoggedIn = !!user && name === user.name;

  const [updateManagerStatus] = useUpdateVenueManagerStatusMutation();

  const [userIsManager, setUserIsManager] = useState(
    data ? data.venueManager : false
  );

  const [venueManagerModalOpen, setVenueManagerModalOpen] = useState(false);

  const [updateImageModalOpen, setUpdateImageModalOpen] = useState(false);
  const [userImage, setUserImage] = useState<string | undefined>(data?.avatar);
  const [errorMessage, setErrorMessage] = useState<string>(
    "Something went wrong. Please try again!"
  );

  const toggleVenueManager = () => {
    setVenueManagerModalOpen(true);
  };

  const sendVenueManagerChange = async (
    body: UpdateVenueManagerStatusRequest
  ) => {
    try {
      const res = await updateManagerStatus(body).unwrap();
      setUserIsManager(res.venueManager);
      setVenueManagerModalOpen(false);
    } catch (err) {
      setErrorMessage((err as Error).message);
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
      setUserImage(data.avatar);
    }
  }, [data]);

  return (
    <>
      {data && !error && (
        <article className="pt-[50px] lg:pt-[80px] antialiased bg-gradient-to-b from-primary to-white h-full w-full pb-40 shadow-md">
          <div className="w-full lg:w-[700px] lg:px-4 mx-auto">
            <div className=" relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl lg:rounded-lg mt-20 lg:mt-24">
              <div className=" mb-10">
                <div className="flex flex-wrap justify-center">
                  <div className="px-4 flex justify-center">
                    <div className="relative">
                      {isLoading ? (
                        <Skeleton circle width={28} height={28} />
                      ) : (
                        <>
                          {userImage ? (
                            <img
                              src={userImage}
                              alt="Profile picture"
                              className="shadow-xl rounded-full align-middle absolute -my-16 left-1/2 transform -translate-x-1/2 max-w-[150px] h-[150px] border border-white object-cover"
                            />
                          ) : (
                            <ProfileIcon className="shadow-xl rounded-full align-middle absolute -my-16 left-1/2 transform -translate-x-1/2 max-w-[150px] h-[150px] border border-white object-cover bg-white" />
                          )}
                          <div
                            onClick={() => setUpdateImageModalOpen(true)}
                            className=" test mt-24 flex gap-2 items-center group cursor-pointer"
                          >
                            <H3 className="!text-gray-400 group-hover:!text-primary group-hover:underline underline-offset-2 transition-all">
                              Edit image
                            </H3>
                            <EditIcon className="!text-gray-400 group-hover:!text-primary transition-all" />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center mt-4 flex flex-col gap-4">
                  <H1 className="!mb-2">{data.name}</H1>

                  <div className="flex gap-2 w-fit mx-auto">
                    {isProfileSameAsLoggedIn ? (
                      <H2
                        className={`${
                          userIsManager ? "!text-primary" : "!text-gray-400"
                        } text-xs !font-medium leading-normal mt-1 uppercase`}
                      >
                        Venue Manager
                      </H2>
                    ) : (
                      <H2
                        className={`!text-primary text-xs !font-medium leading-normal mb-4 uppercase`}
                      >
                        {data.venueManager ? "Venue Manager" : "Venue Tenant"}
                      </H2>
                    )}

                    {isProfileSameAsLoggedIn && (
                      <Toggle
                        onChange={toggleVenueManager}
                        value={userIsManager!}
                      />
                    )}
                  </div>
                  <div className="flex gap-10 w-fit mx-auto mb-6">
                    <div className="text-xs flex flex-col gap-2">
                      <p>Bookings</p>
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
                <div className="w-fit mx-auto">
                  {isProfileSameAsLoggedIn ? (
                    <div className="w-full gap-5 flex items-center justify-between">
                      <NavLink to={`/profile/${data.name}/bookings`}>
                        <SecondaryButton>My bookings</SecondaryButton>
                      </NavLink>
                      {userIsManager && (
                        <NavLink to={`/profile/${data.name}/venues`}>
                          <SecondaryButton>My venues</SecondaryButton>
                        </NavLink>
                      )}
                    </div>
                  ) : (
                    <NavLink to={`/profile/${data.name}/venues`}>
                      <SecondaryButton>See venues</SecondaryButton>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </article>
      )}

      <ErrorMessage
        show={!!error}
        className="mt-4 fixed bottom-36 z-50 left-1/2 -translate-x-1/2 !transform whitespace-nowrap"
        message={errorMessage}
      />

      <ConfirmModal
        text={toggleVenueManagerText()}
        open={venueManagerModalOpen}
        onCancel={() => setVenueManagerModalOpen(false)}
        onConfirm={() =>
          sendVenueManagerChange({
            name: data!.name,
            status: !userIsManager,
          })
        }
      />

      <UpdateImageModal
        open={updateImageModalOpen}
        setOpen={setUpdateImageModalOpen}
        userImage={userImage}
        setUserImage={setUserImage}
      />
    </>
  );
}

export default ProfilePage;
