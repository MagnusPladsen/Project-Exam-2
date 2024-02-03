import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

function LoadingSkeleton({ number }: { number: number }) {
  return (
    <>
      {Array.from({ length: number }, (_, index) => (
        <div
          className={`flex w-full border-x border-x-primary px-3 py-2 ${
            index !== 0 ? "border-t border-t-gray-300" : ""
          } ${
            index === number - 1 ? "rounded-b border-b border-b-primary" : ""
          }`}
          key={index}
        >
          <Skeleton
            enableAnimation
            containerClassName="flex-1"
            highlightColor="#FFE3EB"
          />
        </div>
      ))}
    </>
  );
}

export default LoadingSkeleton;
