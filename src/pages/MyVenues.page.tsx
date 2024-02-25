import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton.component";
import H1 from "../components/common/H1.component";
import ConfirmModal from "../components/modals/ConfirmModal.component";
import VenueModal from "../components/modals/venue/VenueModal.component";
import capitalizeFirstLetter from "../formatters/capitalizeFirstLetter";
import useAuth from "../hooks/useAuth";
import {
  useDeleteVenueMutation,
  useGetProfileQuery,
} from "../services/api/holidazeApi";
import { Venue } from "../types/types";
import renderSkeletons from "../components/myVenues/RenderSkeletons";
import renderVenue from "../components/myVenues/RenderVenues";

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

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

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
          setDeleteVenueActive(false);
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
