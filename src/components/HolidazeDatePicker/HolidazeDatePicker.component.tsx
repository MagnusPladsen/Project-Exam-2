import formatBookingsForDatePicker from "./formatters";
import DatePicker, {
  DatePickerProps,
  DayRange,
} from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";

function HolidazeDatePicker({
  value,
  onChange,
  ...otherProps
}: DatePickerProps<DayRange>) {
  const holidazeStyleInput = ({ ref }: any) => (
    <div className="flex flex-col my-5 gap-2 w-full lg:px-0 lg:w-52 px-[5vw]">
      <label className={` text-left text-gray-500`}>Booking:</label>
      <input
        ref={ref}
        className={`appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg w-full`}
        placeholder="Check availability"
      />
    </div>
  );
  return (
    <DatePicker
      {...otherProps}
      colorPrimary="#FF467C"
      colorPrimaryLight="#FFE3EB"
      value={value}
      onChange={onChange}
      renderInput={holidazeStyleInput}
      wrapperClassName="!w-full"
    />
  );
}

export default HolidazeDatePicker;
