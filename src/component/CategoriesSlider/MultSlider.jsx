import useGetApiQuery from "../../CustomeHooks/useGetApi";
import Snippet from "../Snippet/Snippet";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./MultSlider.css";

function MultipleItems() {
  // useGetApiQuery is custom hook used to >> get API <<
  const { data, isError, isLoading, error } = useGetApiQuery({
    url: "https://ecommerce.routemisr.com/api/v1/categories",
    uniqueKey: "categoriesSlider",
  });

  // config. obj. send to Slider comp.
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    initialSlide: 0,
    arrow: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
          arrow: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrow: false,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrow: false,
        },
      },
    ],
  };

  // when req. is failed
  if (isError) {
    // alert msg from sweetalert2 lib.
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${error.response.data.message}`,
      color: "#ff0000",
      background: "#eee",
    });
    return <></>;
  }

  // when req. is load
  if (isLoading) {
    return (
      <>
        <div className="container d-flex justify-content-center align-items-center">
          {/* Snippet comp. from react-loader-spinner lib. */}
          <Snippet />
        </div>
      </>
    );
  }

  // when req. is success
  return (
    <div className="container py-5 overflow-hidden categories-slider">
      <h2 className="mb-sm-5">Featured Categories</h2>
      {/* Slider comp. from react-slick lib. */}
      <Slider {...settings}>
        {data.data.data.map((category) => {
          return (
            <div className="category text-center" key={category._id}>
              <img
                src={category.image}
                alt={category.slug}
                className="img-fluid px-5 px-sm-0"
              />
              <p className="fw-semibold">{category.name}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
export default MultipleItems;
