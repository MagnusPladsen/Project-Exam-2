function ProfileCountStatus({
  userIsManager,
  count,
}: {
  userIsManager: boolean | undefined;
  count: { bookings: number; venues: number } | undefined;
}) {
  return (
    <div className="flex gap-10 w-fit mx-auto mb-6">
      <div className="text-xs flex flex-col gap-2">
        <p>Bookings</p>
        <p className="font-bold text-2xl">{count?.bookings}</p>
      </div>
      {userIsManager && (
        <div className="text-xs flex flex-col gap-2">
          <p>Venues</p>
          <p className="font-bold text-2xl">{count?.venues}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileCountStatus;
