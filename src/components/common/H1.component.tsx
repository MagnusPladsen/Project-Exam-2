import { HolidazeHeaderProps } from "../../types/types";

function H1({ children, className, ...otherProps }: HolidazeHeaderProps) {
  return (
    <h1
      {...otherProps}
      className={`${className} mb-5 text-3xl text-center tracking-tight font-extrabold text-gray-900 truncate text-ellipsis`}
    >
      {children}
    </h1>
  );
}

export default H1;
