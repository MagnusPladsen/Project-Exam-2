import DatePicker, {
  RenderInputProps,
} from "@sentisso/react-modern-calendar-datepicker";
import "@sentisso/react-modern-calendar-datepicker/lib/DatePicker.css";
import { HolidazeDatePickerProps } from "../../types/types";
import H3 from "../common/H3.component";
import { RefObject } from "react";

function HolidazeDatePicker({
  value,
  onChange,
  inputLabel,
  inputPlaceholder,
  ...otherProps
}: HolidazeDatePickerProps) {
  const holidazeStyleInput = ({ ref }: RenderInputProps) => (
    <div className="flex flex-col gap-2 w-full lg:w-52">
      {inputLabel && <H3>{inputLabel}</H3>}
      <input
        ref={ref as RefObject<HTMLInputElement>}
        className={`appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 hover:border-primary focus:ring-primary focus:shadow-lg w-full cursor-pointer hover:placeholder:text-primary`}
        placeholder={inputPlaceholder ?? "Select a date"}
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
      wrapperClassName="!w-full z-0"
    />
  );
}

export default HolidazeDatePicker;
