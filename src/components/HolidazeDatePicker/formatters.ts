function formatBookingsForDatePicker(bookings: Booking[]):
  | {
      year: number;
      month: number;
      day: number;
    }[]
  | undefined {
  return bookings
    .map((booking) => {
      const fromDate = new Date(booking.dateFrom);
      const toDate = new Date(booking.dateTo);

      // Extract year, month, and day from fromDate and toDate
      const fromYear = fromDate.getFullYear();
      const fromMonth = fromDate.getMonth() + 1; // Month is zero-based, so add 1
      const fromDay = fromDate.getDate();

      const toYear = toDate.getFullYear();
      const toMonth = toDate.getMonth() + 1;
      const toDay = toDate.getDate();

      // Create objects for fromDate and toDate
      const fromObj = { year: fromYear, month: fromMonth, day: fromDay };
      const toObj = { year: toYear, month: toMonth, day: toDay };

      return [fromObj, toObj]; // Return an array of objects for each booking
    })
    .flat();
}

export default formatBookingsForDatePicker;
