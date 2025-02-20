import Swal from "sweetalert2";
import useGetApiQuery from "../../CustomeHooks/useGetApi";
import Snippet from "../Snippet/Snippet";
import "./Categories.css";

function Categories() {
  const { data, isError, isLoading, error } = useGetApiQuery({
    url: "https://ecommerce.routemisr.com/api/v1/categories",
    uniqueKey: "categoriesPage",
  });

  // when req. is load
  if (isLoading) {
    return (
      <>
        <div className="container d-flex justify-content-center align-items-center vh-100">
          {/* Snippet comp. from react-loader-spinner lib. */}
          <Snippet />
        </div>
      </>
    );
  }

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

  return (
    <div className="container py-5 categories">
      <h2 className="mb-5">Featured Categories</h2>
      <div className="row gap-4 mx-2 justify-content-center">
        {data.data.data.map((category) => {
          return (
            <div
              className="category rounded-3 p-0 d-flex justify-content-between flex-column overflow-hidden col-sm-6 col-md-4 col-lg-3 "
              key={category._id}
              onClick={() => {
                Swal.fire({
                  imageUrl: `${category.image}`,
                  title: `${category.name}`,
                  text: `${category.slug}`,
                  width: 600,
                  padding: 20,
                  imageHeight: 300,
                  backdrop: "#ff0#00000082",
                  showCloseButton: true,
                  showConfirmButton: false,
                });
              }}
            >
              <img
                src={category.image}
                alt={category.slug}
                className="img-fluid"
              />
              <p className="fw-semibold text-center fs-4 m-4">
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Categories;
