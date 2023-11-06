import { Oval } from "react-loader-spinner";

export const WishListLoader = ({ radius }) => {
  return (
    <Oval
      height={radius ?? 30}
      width={radius ?? 30}
      color="#007bff"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#007bff"
      strokeWidth={6}
      strokeWidthSecondary={6}
    />
  );
};

export const LoadingCartBtn = ({ radius, text }) => {
  return (
    <div className="btn-disabled-wrapper">
      <Oval
        height={radius ?? 15}
        width={radius ?? 15}
        color="#007bff"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#007bff"
        strokeWidth={6}
        strokeWidthSecondary={6}
      />
      {text ?? "Add to Cart"}
    </div>
  );
};
