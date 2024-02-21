function EditIcon({ className }: { className?: string }) {
  return (
    <svg
      className={`${className} w-3.5 h-3.5`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.289998C15 -0.100002 14.35 -0.100002 13.96 0.289998L12.12 2.12L15.87 5.87M0 14.25V18H3.75L14.81 6.93L11.06 3.18L0 14.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default EditIcon;
