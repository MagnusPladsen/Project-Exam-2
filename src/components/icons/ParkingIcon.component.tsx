function ParkingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`${className} w-3 h-3 shrink-0`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        d="M10.5 0.5H3.5C2.70435 0.5 1.94129 0.81607 1.37868 1.37868C0.81607 1.94129 0.5 2.70435 0.5 3.5V10.5C0.5 11.2956 0.81607 12.0587 1.37868 12.6213C1.94129 13.1839 2.70435 13.5 3.5 13.5H10.5C11.2956 13.5 12.0587 13.1839 12.6213 12.6213C13.1839 12.0587 13.5 11.2956 13.5 10.5V3.5C13.5 2.70435 13.1839 1.94129 12.6213 1.37868C12.0587 0.81607 11.2956 0.5 10.5 0.5Z"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.20898 10.514V7.58602M5.20898 7.58602V3.48602H8.39398C8.79181 3.48602 9.17334 3.64406 9.45464 3.92536C9.73595 4.20667 9.89398 4.5882 9.89398 4.98602V6.08602C9.89398 6.48385 9.73595 6.86538 9.45464 7.14668C9.17334 7.42799 8.79181 7.58602 8.39398 7.58602H5.20898Z"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default ParkingIcon;
