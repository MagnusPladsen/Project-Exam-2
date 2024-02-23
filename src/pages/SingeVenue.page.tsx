import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import ConfirmModal from "../components/modals/ConfirmModal.component";
import VenueModal from "../components/modals/venue/VenueModal.component";
import HolidazeTooltip from "../components/tooltip/HolidazeTooltip.component";
import VenueAccordion from "../components/venue/VenueAccordion.component";
import VenueAdminPanel from "../components/venue/VenueAdminPanel.component";
import VenueBookOptions from "../components/venue/VenueBookOptions.component";
import VenueFooter from "../components/venue/VenueFooter.component";
import VenueHeader from "../components/venue/VenueHeader.component";
import VenueImage from "../components/venue/VenueImage.component";
import VenuePriceHeader from "../components/venue/VenuePriceHeader.component";
import useAuth from "../hooks/useAuth";
import {
  useDeleteVenueMutation,
  useGetSingleVenueQuery,
} from "../services/api/holidazeApi";
import { Venue } from "../types/types";

function SingleVenuePage() {
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();
  const { data: venue, isLoading } = useGetSingleVenueQuery(String(id));
  const [deleteVenue] = useDeleteVenueMutation();
  const navigate = useNavigate();

  const [venueToUpdate, setVenueToUpdate] = useState<Venue | undefined>(
    undefined
  );
  const [updateVenueModalOpen, setUpdateVenueModalOpen] = useState(false);
  const [deleteVenueActive, setDeleteVenueActive] = useState(false);

  useEffect(() => {
    if (venueToUpdate) {
      setUpdateVenueModalOpen(true);
    }
  }, [venueToUpdate]);
  useEffect(() => {
    if (!isLoading && !venue) {
      navigate("/venues");
    }
  }, [isLoading, venue]);

  return (
    <article className="pt-[80px] lg:pt-[120px] pb-20 lg:px-6 w-[100vw] lg:w-[900px] mx-auto dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5">
      <VenueHeader venue={venue} isLoading={isLoading} />

      <VenueAdminPanel
        userIsOwner={
          !!(venue && isLoggedIn && user?.name === venue?.owner.name)
        }
        updateVenue={() => setVenueToUpdate(venue)}
        deleteVenue={() => setDeleteVenueActive(true)}
      />

      <div className="lg:p-0 px-[5vw] flex justify-between items-center text-gray-500">
        <VenuePriceHeader venue={venue} isLoading={isLoading} />

        <HolidazeTooltip id="venue-rating" />
        <span
          data-tooltip-id="venue-rating"
          data-tooltip-content={`This venue has gotten an average rating of ${venue?.rating} out of 5`}
          className="text-sm"
        >
          <StarRatings
            rating={isLoading || !venue ? 5 : venue.rating}
            numberOfStars={5}
            starRatedColor={"gold"}
            starDimension={"20px"}
            starSpacing={"0px"}
          />
        </span>
      </div>

      <VenueImage venue={venue} isLoading={isLoading} />

      <VenueAccordion venue={venue!} isLoading={isLoading} />

      <VenueBookOptions venue={venue} isLoading={isLoading} />

      <VenueFooter venue={venue} isLoading={isLoading} />

      <ConfirmModal
        text={
          "Are you sure you want to delete this venue? This action cannot be undone!"
        }
        open={deleteVenueActive}
        onCancel={() => setDeleteVenueActive(false)}
        onConfirm={() => {
          deleteVenue(venue!.id);
          navigate("/venues");
        }}
      />

      <VenueModal
        setOpen={setUpdateVenueModalOpen}
        open={updateVenueModalOpen}
        venue={venueToUpdate}
        updateMode
      />
    </article>
  );
}

export default SingleVenuePage;
