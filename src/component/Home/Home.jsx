import "./Home.css";
import Products from "./../Products/Products";
import SimpleSlider from "../SimpleSlider/SimpleSlider";
import MultipleItems from "../CategoriesSlider/MultSlider";
function Home() {
  return (
    <>
      <SimpleSlider />
      <div className="clear-both"></div>
      <MultipleItems />
      <Products />
    </>
  );
}
export default Home;
