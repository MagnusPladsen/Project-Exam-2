import { HolidazeHeaderProps } from "../../types/types";

function H3({ children, className = " ", ...otherProps }: HolidazeHeaderProps) {
  return (
    <h3
      {...otherProps}
      className={`${className} text-sm font rtl:text-right text-gray-900`}
    >
      {children}
    </h3>
  );
}

export default H3;
