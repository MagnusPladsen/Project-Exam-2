import { motion } from "framer-motion";
import H1 from "../components/common/H1.component";
import H3 from "../components/common/H3.component";
import VenueCard from "../components/venue/VenueCard.component";
import formatDate from "../formatters/formatToDate";
import useAuth from "../hooks/useAuth";
import { Venue } from "../types/types";
import {
  useDeleteVenueMutation,
  useGetProfileQuery,
} from "../services/api/holidazeApi";
import { useNavigate, useParams } from "react-router-dom";
import capitalizeFirstLetter from "../formatters/capitalizeFirstLetter";
import Skeleton from "react-loading-skeleton";
import PrimaryButton from "../components/buttons/PrimaryButton.component";
import { useState, useEffect } from "react";
import ConfirmModal from "../components/modals/ConfirmModal.component";
import VenueModal from "../components/modals/venue/VenueModal.component";

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

function renderSkeletons(amount: number) {
  const skeletons = [];
  for (let i = 0; i < amount; i++) {
    skeletons.push(
      <div className="flex flex-col gap-1 items-center">
        <Skeleton height={20} width={120} />
        <VenueCard isLoading key={`skeleton${i}`} />
      </div>
    );
  }
  return skeletons;
}

function MyVenuesPage() {
  const navigate = useNavigate();
  const { name } = useParams();
  const { user } = useAuth();

  const { data, error, isLoading } = useGetProfileQuery(name!);
  const [deleteVenue] = useDeleteVenueMutation();

  const isProfileSameAsLoggedIn = !!user && name === user.name;

  const [VenueModalOpen, setVenueModalOpen] = useState(false);
  const [updateVenueModalOpen, setUpdateVenueModalOpen] = useState(false);
  const [venuesStepper, setVenuesStepper] = useState(4);
  const [venuesToShow, setVenuesToShow] = useState<Venue[]>([]);
  const [venueToUpdate, setVenueToUpdate] = useState<Venue | undefined>(
    undefined
  );
  const [deleteVenueActive, setDeleteVenueActive] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState<Venue | undefined>(
    undefined
  );

  const showMoreVenues = () => {
    setVenuesStepper((prev) => prev + prev);
  };

  useEffect(() => {
    if (data) {
      setVenuesToShow(data.venues!.slice(-venuesStepper).reverse());
    }
  }, [venuesStepper, data]);

  useEffect(() => {
    if (venueToUpdate) {
      setUpdateVenueModalOpen(true);
    }
  }, [venueToUpdate]);

  useEffect(() => {
    if (venueToDelete) {
      setDeleteVenueActive(true);
    }
  }, [venueToDelete]);

  if (error) {
    navigate("/404");
  }

  return (
    <section className="min-h-[100vh] pt-[80px] lg:pt-[120px] mx-auto pb-16 lg:px-6">
      <div className="mx-auto lg:max-w-screen-sm text-center mb-8 flex flex-col w-[90vw] lg:min-w-[900px] lg:w-[900px]">
        <H1 className="!mb-10">
          {isProfileSameAsLoggedIn
            ? "My venues"
            : `${data ? capitalizeFirstLetter(data.name) : ""} venues`}
        </H1>

        {isProfileSameAsLoggedIn && (
          <div className="flex flex-col gap-4 mb-10 w-full">
            <PrimaryButton
              onClick={() => setVenueModalOpen(true)}
              className="!mx-auto "
            >
              Create venue
            </PrimaryButton>
          </div>
        )}

        {data && !(data.venues!.length === 0) ? (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.1 }}
            className="flex-col mb-20 grid gap-8 lg:grid-cols-2 xl:grid-cols-3"
          >
            {isLoading && !data && renderSkeletons(5)}
            {venuesToShow &&
              venuesToShow?.map((venue) =>
                renderVenue(venue, setVenueToUpdate, setVenueToDelete)
              )}
          </motion.div>
        ) : (
          <p>No venues found...</p>
        )}

        {venuesToShow && data && venuesToShow.length < data.venues!.length! && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => showMoreVenues()}
            className="w-full mx-auto"
          >
            <PrimaryButton>Show more</PrimaryButton>
          </motion.div>
        )}
      </div>

      <ConfirmModal
        text={
          "Are you sure you want to delete this venue? This action cannot be undone!"
        }
        open={deleteVenueActive}
        onCancel={() => setDeleteVenueActive(false)}
        onConfirm={() => {
          deleteVenue(venueToDelete!.id);
        }}
      />

      <VenueModal
        setOpen={
          updateVenueModalOpen && venueToUpdate
            ? setUpdateVenueModalOpen
            : setVenueModalOpen
        }
        open={VenueModalOpen || updateVenueModalOpen}
        venue={venueToUpdate}
        updateMode={updateVenueModalOpen}
      />
    </section>
  );
}

export default MyVenuesPage;
