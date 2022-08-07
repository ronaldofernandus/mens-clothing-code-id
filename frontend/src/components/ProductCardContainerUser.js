import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCardUser from "./ProductCardUser";

const ProductCardContainerUser = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  return (
    <div className="grid px-24 3xl:px-[74px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-16 lg:gap-y-8">
      {data.map((product, index) => {
        return (
          <button
            key={index}
            onClick={() => navigate(`/user/details/${product.id}`)}
          >
            <ProductCardUser product={product} />
          </button>
        );
      })}
    </div>
  );
};

export default ProductCardContainerUser;
