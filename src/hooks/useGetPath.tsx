function useGetPath() {
  const url = new URL(window.location.href);
  const protectedRoutes = ["profile", "venues"];

  const venueIdParam = url.searchParams.get("venueId");
  const path = url.pathname;
  const isProtectedRoute = protectedRoutes.includes(path.split("/")[1]);

  return { venueIdParam, url, path, isProtectedRoute };
}

export default useGetPath;
