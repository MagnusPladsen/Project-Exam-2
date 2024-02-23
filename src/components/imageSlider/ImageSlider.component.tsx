import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function ImageSlider({
  images,
  className,
  imageClassName,
}: {
  images: string[];
  className?: string;
  imageClassName?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <>
      {isLoading && <Skeleton width={"100%"} height={600} />}
      <Carousel className={className}>
        {images.map((image, index) => (
          <div key={image}>
            <img
              src={image}
              alt={`Venue Image ${index}`}
              className={`${imageClassName} max-h-[600px] lg:max-h-[800px] object-cover`}
              onLoad={() => setIsLoading(false)}
            />
          </div>
        ))}
      </Carousel>
    </>
  );
}

export default ImageSlider;
