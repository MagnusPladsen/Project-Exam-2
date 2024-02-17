import DatePicker from "react-modern-calendar-datepicker";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { HolidazeDatePickerProps } from "../../types/types";
import H2 from "../common/H2.component";

function HolidazeDatePicker({
  value,
  onChange,
  inputLabel,
  inputPlaceholder,
  ...otherProps
}: HolidazeDatePickerProps) {
  const holidazeStyleInput = ({ ref }: any) => (
    <div className="flex flex-col my-5 gap-2 w-full lg:px-0 lg:w-52 px-[5vw]">
      {inputLabel && <H2>{inputLabel}</H2>}
      <input
        ref={ref}
        className={`appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:shadow-lg w-full`}
        placeholder={inputPlaceholder || "Select a date"}
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
