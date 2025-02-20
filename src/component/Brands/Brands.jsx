import Swal from "sweetalert2";
import useGetApiQuery from "../../CustomeHooks/useGetApi";
import Snippet from "../Snippet/Snippet";
import "./Brands.css";

function Brands() {
  const result = useGetApiQuery({
    url: "https://ecommerce.routemisr.com/api/v1/brands",
    uniqueKey: "brands",
  });

  if (result.isLoading) {
    return (
      <>
        <div className="container d-flex justify-content-center align-items-center vh-100">
          <Snippet />
        </div>
      </>
    );
  }
  if (result.isError) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `${result.error.response.data.message}`,
    });
    return <></>;
  }
  return (
    <>
      <div className="container">
        <div className="brands pb-5">
          <h2 className="py-4">All Brands</h2>
          <div className="row gap-4 justify-content-center">
            {result.data.data.data.map((brand) => {
              return (
                <div
                  key={brand._id}
                  className="brand rounded-5 overflow-hidden col-10 col-sm-5 col-lg-3 col-xl-2"
                >
                  <img
                    className="img-fluid"
                    src={brand.image}
                    alt={brand.slug}
                  />
                  <h4 className="mb-4 ms-3">{brand.name}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Brands;
