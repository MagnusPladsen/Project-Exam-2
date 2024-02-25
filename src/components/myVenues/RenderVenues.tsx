import formatDate from "../../formatters/formatToDate";
import { Venue } from "../../types/types";
import H3 from "../common/H3.component";
import VenueCard from "../venue/VenueCard.component";

function renderVenue(
  venue: Venue,
  setVenueToUpdate: React.Dispatch<React.SetStateAction<Venue | undefined>>,
  setVenueToDelete: React.Dispatch<React.SetStateAction<Venue | undefined>>
) {
  return (
    <div
      key={venue.id}
      className="flex flex-col gap-2 w-full items-center justify-center"
    >
      <H3 className="flex gap-1 items-center text-gray-400">
        {venue.created !== venue.updated ? (
          <>
            <span>Updated: </span>
            <span>{formatDate(venue.updated)}</span>
          </>
        ) : (
          <>
            <span>Created: </span>
            <span>{formatDate(venue.created)}</span>
          </>
        )}
      </H3>
      <VenueCard
        venue={venue}
        className="!mx-auto"
        profilePage
        setVenueToDelete={setVenueToDelete}
        setVenueToUpdate={setVenueToUpdate}
      />
    </div>
  );
}

export default renderVenue;
