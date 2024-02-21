function useGetPath() {
  const url = new URL(window.location.href);
  const protectedRoutes = ["profile"];

  const venueIdParam = url.searchParams.get("venueId");
  const path = url.pathname;
  const isProtectedRoute = protectedRoutes.includes(path.split("/")[1]);
  const isOnProfileRoute = path.includes("profile");

  return { venueIdParam, url, path, isProtectedRoute, isOnProfileRoute };
}

export default useGetPath;
