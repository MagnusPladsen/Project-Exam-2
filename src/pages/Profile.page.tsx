import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import H1 from "../components/common/H1.component";
import ErrorMessage from "../components/messages/ErrorMessage.component";
import ConfirmModal from "../components/modals/ConfirmModal.component";
import UpdateImageModal from "../components/modals/profile/UpdateImageModal.component";
import ProfileCountStatus from "../components/profile/ProfileCountStatus.component";
import ProfileImage from "../components/profile/ProfileImage.component";
import ProfileLinks from "../components/profile/ProfileLinks.component";
import ProfileManagerStatus from "../components/profile/ProfileManagerStatus.component";
import useAuth from "../hooks/useAuth";
import {
  useGetProfileQuery,
  useUpdateVenueManagerStatusMutation,
} from "../services/api/holidazeApi";
import { UpdateVenueManagerStatusRequest } from "../types/types";

function ProfilePage() {
  const navigate = useNavigate();
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
      setUserImage(data.avatar);
    }
    if (!data && !isLoading) {
      navigate("/404");
    }
  }, [data]);

  return (
    <>
      {data && !error && (
        <article className="pt-[50px] lg:pt-[80px] antialiased bg-gradient-to-b from-primary to-white h-full w-full pb-40 shadow-md">
          <div className="w-full lg:w-[700px] lg:px-4 mx-auto">
            <div className=" relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl lg:rounded-lg mt-20 lg:mt-24">
              <div className=" mb-10">
                <ProfileImage
                  isLoading={isLoading}
                  userImage={userImage}
                  setUpdateImageModalOpen={setUpdateImageModalOpen}
                  isProfileSameAsLoggedIn={isProfileSameAsLoggedIn}
                />
                <div className="text-center mt-4 flex flex-col gap-4">
                  <H1 className="!mb-2">{data.name}</H1>

                  <ProfileManagerStatus
                    isProfileSameAsLoggedIn={isProfileSameAsLoggedIn}
                    toggleVenueManager={toggleVenueManager}
                    userIsManager={userIsManager}
                  />

                  <ProfileCountStatus
                    count={data._count}
                    userIsManager={userIsManager}
                  />
                </div>
                <ProfileLinks
                  isProfileSameAsLoggedIn={isProfileSameAsLoggedIn}
                  userIsManager={userIsManager}
                  name={data.name}
                />
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
