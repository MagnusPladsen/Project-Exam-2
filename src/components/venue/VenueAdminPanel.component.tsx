import H2 from "../common/H2.component";
import Crossicon from "../icons/CrossIcon.component";
import EditIcon from "../icons/EditIcon.component";

function VenueAdminPanel({
  updateVenue,
  deleteVenue,
  userIsOwner,
}: {
  updateVenue: () => void;
  deleteVenue: () => void;
  userIsOwner: boolean;
}) {
  return (
    <>
      {userIsOwner && (
        <div className="flex flex-col gap-2 border border-primary rounded my-2 lg:mx-0 mx-[5vw] p-4 bg-primary-light">
          <H2 className="!mx-auto text-primary text-center !font-bold max-w-[80%] ">
            You&apos;re the administrator for this venue
          </H2>
          <div className=" flex text-primary cursor-pointer hover:underline underline-offset-2 transition-all justify-between font-medium">
            <div className="flex items-center gap-2" onClick={updateVenue}>
              <EditIcon /> Edit
            </div>
            <div
              className="flex items-center gap-2 text-red-500"
              onClick={deleteVenue}
            >
              Delete
              <Crossicon />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VenueAdminPanel;
