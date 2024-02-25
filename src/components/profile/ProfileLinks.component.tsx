import { Link } from "react-router-dom";
import SecondaryButton from "../buttons/SecondaryButton.component";

function ProfileLinks({
  isProfileSameAsLoggedIn,
  name,
  userIsManager,
}: {
  isProfileSameAsLoggedIn: boolean;
  name: string;
  userIsManager: boolean | undefined;
}) {
  return (
    <div className="w-fit mx-auto">
      {isProfileSameAsLoggedIn ? (
        <div className="w-full gap-5 flex items-center justify-between">
          <Link to={`/profile/${name}/bookings`}>
            <SecondaryButton>My bookings</SecondaryButton>
          </Link>
          {userIsManager && (
            <Link to={`/profile/${name}/venues`}>
              <SecondaryButton>My venues</SecondaryButton>
            </Link>
          )}
        </div>
      ) : (
        <Link to={`/profile/${name}/venues`}>
          <SecondaryButton>See venues</SecondaryButton>
        </Link>
      )}
    </div>
  );
}

export default ProfileLinks;
