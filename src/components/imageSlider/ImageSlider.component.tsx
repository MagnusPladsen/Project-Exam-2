import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function ImageSlider({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) {
  return (
    <Carousel className={className}>
      {images.map((image, index) => (
        <div key={image}>
          <img src={image} alt={`Venue Image ${index}`} className="max-h-[600px] lg:max-h-[800px] object-cover" />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
