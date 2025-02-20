import { InfinitySpin } from "react-loader-spinner";

function Snippet() {
  return (
    <>
      <InfinitySpin
        visible={true}
        width="200"
        color="#0aad0a"
        ariaLabel="infinity-spin-loading"
      />
    </>
  );
}

export default Snippet;
