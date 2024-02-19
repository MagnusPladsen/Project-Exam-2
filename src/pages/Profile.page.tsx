import { useState } from "react";
import H1 from "../components/common/H1.component";
import H2 from "../components/common/H2.component";
import Toggle from "../components/forms/Toggle.component";
import ProfileIcon from "../components/icons/Profileicon.component";
import ConfirmModal from "../components/modals/ConfirmModal.component";
import useAuth from "../hooks/useAuth";
import { useGetProfileQuery } from "../services/api/holidazeApi";

function ProfilePage() {
  const { user } = useAuth();
  const { data, error, isLoading } = useGetProfileQuery(user!.name);

  const [venueManagerModalOpen, setVenueManagerModalOpen] = useState(false);

  function toggleVenueManager() {
    setVenueManagerModalOpen(true);
    console.log("clicked");
  }

  console.log(data);
  return (
    <>
      {user && (
        <article className="pt-[50px] lg:pt-[80px] antialiased bg-gradient-to-b from-primary to-white h-full w-full">
          <div className="w-full lg:w-[900px] px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-20 lg:mt-24">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile picture"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -my-16 left-1/2 transform -translate-x-1/2 max-w-[150px]"
                        />
                      ) : (
                        <ProfileIcon className="shadow-xl rounded-full h-auto align-middle border-none absolute -my-16 left-1/2 transform -translate-x-1/2 !max-w-[150px]" />
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center mt-28 flex flex-col gap-4">
                  <H1 className="!mb-2">{user.name}</H1>
                  <div className="flex gap-2 w-fit mx-auto">
                    <H2 className="text-xs !text-gray-400 leading-normal mt-1 uppercase ">
                      Venue Manager
                    </H2>
                    <Toggle onChange={toggleVenueManager} />
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
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
        text="Are you sure you want to register your user as a venue manager?"
        open={venueManagerModalOpen}
        onCancel={() => setVenueManagerModalOpen(false)}
        onConfirm={() => setVenueManagerModalOpen(false)}
      />
    </>
  );
}

export default ProfilePage;
