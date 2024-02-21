function useGetPath() {
  const url = new URL(window.location.href);
  const protectedRoutes = ["profile"];

  const venueIdParam = url.searchParams.get("venueId");
  const path = url.pathname;

  const pathSegments = location.pathname.split("/");

  // Check if the second segment of the path is in protectedRoutes
  const isProtectedRoute =
    pathSegments.length > 1 && protectedRoutes.includes(pathSegments[1]);
  const isOnProfileRoute = path.includes("profile");

  return { venueIdParam, url, path, isProtectedRoute, isOnProfileRoute };
}

export default useGetPath;
