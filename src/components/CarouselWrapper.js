import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ProductItem } from "./ProductItem";

const CarouselWrapper = ({ products }) => {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlaySpeed={3000}
      centerMode={false}
      containerClass="container-padding-bottom"
      draggable
      focusOnSelect
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1530,
          },
          items: 4,
          partialVisibilityGutter: 40,
        },
        desktopSmall: {
          breakpoint: {
            max: 1530,
            min: 1140,
          },
          items: 3,
          partialVisibilityGutter: 40,
        },
        tablet: {
          breakpoint: {
            max: 1140,
            min: 768,
          },
          items: 2,
          partialVisibilityGutter: 30,
        },
        mobile: {
          breakpoint: {
            max: 768,
            min: 0,
          },
          items: 1,
          partialVisibilityGutter: 30,
        },
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots
      slidesToSlide={1}
      swipeable
      dotListClass="custom-dot-list-style"
    >
      {products.map((product) => (
        <div key={product._id} style={{ margin: "auto", width: "fit-content" }}>
          <ProductItem dataset={product} />
        </div>
      ))}
    </Carousel>
  );
};

export default CarouselWrapper;
