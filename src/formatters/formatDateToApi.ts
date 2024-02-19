import { DayRange } from "@sentisso/react-modern-calendar-datepicker";

function formatDateToApi(dateRange: DayRange) {
  const { from, to } = dateRange;

  const fromDateString =
    from &&
    from?.year +
      "-" +
      (from.month < 10 ? "0" + from.month : from.month) +
      "-" +
      (from.day < 10 ? "0" + from.day : from.day);

  const toDateString =
    to &&
    to?.year +
      "-" +
      (to.month < 10 ? "0" + to.month : to.month) +
      "-" +
      (to.day < 10 ? "0" + to.day : to.day);

  const fromDate = fromDateString ? new Date(fromDateString) : null;
  const toDate = toDateString ? new Date(toDateString) : null;

  return { dateFrom: fromDate, dateTo: toDate };
}

export default formatDateToApi;
