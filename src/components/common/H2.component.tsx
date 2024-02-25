import { HolidazeHeaderProps } from "../../types/types";

function H2({ children, className, ...otherProps }: HolidazeHeaderProps) {
  return (
    <h2
      {...otherProps}
      className={`${className} font-bold rtl:text-right text-gray-900`}
    >
      {children}
    </h2>
  );
}

export default H2;
