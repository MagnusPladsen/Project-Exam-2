import Skeleton from "react-loading-skeleton";
import H3 from "../common/H3.component";
import EditIcon from "../icons/EditIcon.component";
import ProfileIcon from "../icons/Profileicon.component";

function ProfileImage({
  isLoading,
  userImage,
  setUpdateImageModalOpen,
  isProfileSameAsLoggedIn,
  fetchUser,
}: {
  isLoading: boolean;
  userImage?: string;
  setUpdateImageModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isProfileSameAsLoggedIn: boolean;
  fetchUser: () => void;
}) {
  return (
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
                  alt="Profile avatar"
                  className="shadow-xl rounded-full align-middle absolute -my-16 left-1/2 transform -translate-x-1/2 max-w-[150px] h-[150px] aspect-square border border-white object-cover"
                />
              ) : (
                <ProfileIcon className="shadow-xl rounded-full align-middle absolute -my-16 left-1/2 transform -translate-x-1/2 max-w-[150px] h-[150px] border border-white object-cover bg-white" />
              )}
              <button
                onClick={async () => {
                  if (isProfileSameAsLoggedIn) {
                    fetchUser();
                    setUpdateImageModalOpen(true);
                  }
                }}
                className=" test mt-24 flex gap-2 items-center group cursor-pointer"
              >
                {isProfileSameAsLoggedIn && (
                  <>
                    <H3 className="!text-gray-400 group-hover:!text-primary group-hover:underline underline-offset-2 transition-all">
                      Edit image
                    </H3>
                    <EditIcon className="!text-gray-400 group-hover:!text-primary transition-all" />
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileImage;
