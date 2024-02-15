import { ITooltip, Tooltip } from "react-tooltip";

function HolidazeTooltip({ ...props }: ITooltip) {
  return (
    <Tooltip
      {...props}
      place="top"
      delayHide={150}
      border={"1px solid white"}
      style={{
        backgroundColor: "#FF467C",
        borderRadius: "4px",
      }}
    />
  );
}

export default HolidazeTooltip;
