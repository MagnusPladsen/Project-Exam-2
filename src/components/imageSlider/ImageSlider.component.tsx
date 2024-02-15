import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function ImageSlider({ images }: { images: string[] }) {
  return (
    <Carousel>
      {images.map((image, index) => (
        <div key={image}>
          <img
            src={image}
            alt={`Venue Image ${index}`}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default ImageSlider;
