import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import VenueCard from "./VenueCard";
import { getVenueById } from "../api/venueApi"; // Import your API function to fetch venue details

function SingleVenuePage() {
  const { id } = useParams(); // Get the venue ID from URL parameter
  const [venue, setVenue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const venueData = await getVenueById(id); // Fetch venue details using the ID
        setVenue(venueData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching venue:", error);
        setIsLoading(false);
      }
    };

    fetchVenue();
  }, [id]);

  return (
    <div className="container mx-auto px-4 mt-8">
      {isLoading ? (
        // Render a loading skeleton while data is being fetched
        <VenueCard isLoading={true} />
      ) : (
        // Render the venue details once fetched
        <VenueCard venue={venue} />
      )}
    </div>
  );
}

export default SingleVenuePage;
