import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function useGetPath() {
  const navigate = useNavigate();

  const url = new URL(window.location.href);
  const protectedRoutes = ["profile"];

  const venueIdParam = url.searchParams.get("venueId");
  const path = url.pathname;

  const pathSegments = location.pathname.split("/");

  // Check if the second segment of the path is in protectedRoutes
  const isProtectedRoute =
    pathSegments.length > 1 && protectedRoutes.includes(pathSegments[1]);

  const [isOnProfileRoute, setIsOnProfileRoute] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const path = url.pathname;
    const isOnProfileRoute = path.startsWith("/profile");
    setIsOnProfileRoute(isOnProfileRoute);
  }, [navigate]);

  return { venueIdParam, url, path, isProtectedRoute, isOnProfileRoute };
}

export default useGetPath;
