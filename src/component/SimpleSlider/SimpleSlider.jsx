import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import sliderImgOne from "../../assets/images/sliderOne.png";
import sliderImgTwo from "../../assets/images/sliderTwo.jpeg";
import sliderImgThree from "../../assets/images/sliderThree.jpeg";
import sliderImgFour from "../../assets/images/sliderFour.jpeg";
import "./SimpleSlider.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div className="container">
        <div className="row py-3">
          <div className="content-dynamic col-8 pe-0">
            <Slider {...settings}>
              <img src={sliderImgThree} alt="Not found" />
              <img src={sliderImgTwo} alt="Not found" />
              <img src={sliderImgTwo} alt="Not found" />
              <img src={sliderImgThree} alt="Not found" />
            </Slider>
          </div>
          <div className="content-static col-4 d-flex flex-column ps-0">
            <img src={sliderImgFour} alt="Not found" />
            <img src={sliderImgOne} alt="Not found" />
          </div>
        </div>
      </div>
    </>
  );
}
