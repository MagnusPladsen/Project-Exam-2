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
  return (
    <Carousel className={className}>
      {images.map((image, index) => (
        <div key={image}>
          <img
            src={image}
            alt={`Venue Image ${index}`}
            className={`${imageClassName} max-h-[600px] lg:max-h-[800px] object-cover`}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
