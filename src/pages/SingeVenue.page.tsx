import Skeleton from "react-loading-skeleton";
import { useNavigate, useParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import H1 from "../components/common/H1.component";
import ImageSlider from "../components/imageSlider/ImageSlider.component";
import HolidazeTooltip from "../components/tooltip/HolidazeTooltip.component";
import VenueAccordion from "../components/venue/VenueAccordion.component";
import VenueBookOptions from "../components/venue/VenueBookOptions.component";
import VenueFooter from "../components/venue/VenueFooter.component";
import capitalizeFirstLetter from "../formatters/capitalizeFirstLetter";
import {
  useDeleteVenueMutation,
  useGetSingleVenueQuery,
} from "../services/api/holidazeApi";
import useAuth from "../hooks/useAuth";
import EditIcon from "../components/icons/EditIcon.component";
import { useState, useEffect } from "react";
import { Venue } from "../types/types";
import VenueModal from "../components/modals/venue/VenueModal.component";
import Crossicon from "../components/icons/CrossIcon.component";
import H2 from "../components/common/H2.component";
import ConfirmModal from "../components/modals/ConfirmModal.component";

function SingleVenuePage() {
  const { id } = useParams();
  const { user, isLoggedIn } = useAuth();
  const { data: venue, error, isLoading } = useGetSingleVenueQuery(String(id));
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

  if (error) {
    return (
      <div>Error! Could not find the venue requested... Please try again.</div>
    );
  }
// TODO: FIX, IF NOT VENUE ID, NAVIGATE TO VENUES
  if (!isLoading && !venue) {
    navigate("/venues");
  }

  return (
    <article className="pt-[80px] lg:pt-[120px] pb-8 lg:pb-16 lg:px-6 w-[100vw] lg:w-[900px] mx-auto dark:bg-gray-800 dark:border-gray-700 flex flex-col gap-5">
      <H1 className="max-w-[90vw] mx-auto">
        {isLoading || !venue ? (
          <Skeleton width={200} height={20} />
        ) : (
          capitalizeFirstLetter(venue.name)
        )}
      </H1>

      {venue && isLoggedIn && user?.name === venue?.owner.name && (
        <div className="flex flex-col gap-2 border border-primary rounded my-2 lg:mx-0 mx-[5vw] p-4 bg-primary-light">
          <H2 className="!mx-auto text-primary text-center !font-bold max-w-[80%] ">
            You&apos;re the administrator for this venue
          </H2>
          <div className=" flex text-primary cursor-pointer hover:underline underline-offset-2 transition-all justify-between font-medium">
            <div
              className="flex items-center gap-2"
              onClick={() => setVenueToUpdate(venue)}
            >
              <EditIcon /> Edit
            </div>
            <div
              className="flex items-center gap-2 text-red-500"
              onClick={() => setDeleteVenueActive(true)}
            >
              Delete
              <Crossicon />
            </div>
          </div>
        </div>
      )}

      <div className="lg:p-0 px-[5vw] flex justify-between items-center  text-gray-500">
        {isLoading || !venue ? (
          <Skeleton width={200} height={20} />
        ) : (
          <span className="bg-green-200 text-green-600 font-medium inline-flex items-center px-2.5 py-1 rounded dark:bg-primary-light gap-2">
            Price per night: <span className="font-bold">$ {venue.price}</span>
          </span>
        )}

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

      {isLoading || !venue ? (
        <Skeleton width={"100%"} height={600} />
      ) : venue.media.length > 0 ? (
        <ImageSlider
          images={venue.media}
          className="lg:rounded"
          imageClassName="lg:rounded"
        />
      ) : (
        <img
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1255/image-not-found.svg"
          alt="Venue"
          className="max-h-[600px] lg:max-h-[800px] w-full border bg-primary-light rounded"
        />
      )}

      <VenueAccordion venue={venue!} isLoading={isLoading} />

      {user?.name !== venue?.owner.name && (
        <VenueBookOptions venue={venue} isLoading={isLoading} />
      )}

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
