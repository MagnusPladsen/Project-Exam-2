function DropDownIcon({ className }: { className?: string }) {
  return (
    <svg
      data-accordion-icon
      className={`${className} w-3 h-3 rotate-180 shrink-0`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 5 5 1 1 5"
      />
    </svg>
  );
}

export default DropDownIcon;
