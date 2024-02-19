import { DayRange } from "@sentisso/react-modern-calendar-datepicker";
import { CreateBookingRequest } from "../../types/types";
import formatDateToApi from "../formatDateToApi";

function formatNewBooking(
  venueId: string,
  dateRange: DayRange,
  guests: number
): CreateBookingRequest | undefined {
  const { dateFrom, dateTo } = formatDateToApi(dateRange);
  if (!dateFrom || !dateTo) return undefined;
  return {
    venueId,
    guests,
    dateFrom,
    dateTo,
  };
}

export default formatNewBooking;