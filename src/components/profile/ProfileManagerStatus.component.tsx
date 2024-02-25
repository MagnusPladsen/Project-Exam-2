import H2 from "../common/H2.component";
import Toggle from "../forms/Toggle.component";

function ProfileManagerStatus({
  isProfileSameAsLoggedIn,
  userIsManager,
  toggleVenueManager,
}: {
  isProfileSameAsLoggedIn: boolean;
  userIsManager: boolean | undefined;
  toggleVenueManager: () => void;
}) {
  return (
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
          {userIsManager ? "Venue Manager" : "Venue Tenant"}
        </H2>
      )}

      {isProfileSameAsLoggedIn && (
        <Toggle onChange={toggleVenueManager} value={userIsManager!} />
      )}
    </div>
  );
}

export default ProfileManagerStatus;
