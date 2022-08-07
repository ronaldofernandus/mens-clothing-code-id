import React from "react";
import { ProductCard } from "./";
import { useNavigate } from "react-router-dom";
import base_url from "../helpers/base_url";
import {
  oneStar,
  twoStars,
  threeStars,
  fourStars,
  fiveStars,
} from "../helpers/stars";
import { MdDescription } from "react-icons/md";
import Swal from "sweetalert2";

const ProductCardContainerCMS = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const url = base_url;

  return (
    <div>
      <table className="table-fixed w-full">
        <thead>
          <tr className="h-20 uppercase text-left">
            <th colSpan="4" className="text-center">
              Product
            </th>
            <th className="text-left">Price</th>
            <th className="text-left">Final Price</th>
            <th className="text-center">Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product, index) => {
            return (
              <tr key={index}>
                <td className="py-1">{index + 1}.</td>
                <td className="py-1">
                  <img
                    className="w-[200px] h-[200px] hover:shadow-xl hover:scale-125 cursor-pointer object-cover"
                    alt=""
                    src={
                      product.ProductImages[0] === undefined
                        ? "https://sipr.mojokertokab.go.id/images/avatar/no-image.jpg"
                        : `${url}/images/${product.ProductImages[0].filename}`
                    }
                    onClick={() =>
                      Swal.fire({
                        width: 1000,
                        imageUrl:
                          url + "/images/" + product.ProductImages[0].filename,
                        imageHeight: 500,
                      })
                    }
                  />
                </td>
                <td colspan="2" className="py-1 text-center">
                  {product.name}
                </td>
                {/* <td className="w-2/6 py-1">
                  <div className="text-amber-500 text-lg flex text-start">
                    {product.rating === 1
                      ? oneStar
                      : product.rating === 2
                      ? twoStars
                      : product.rating === 3
                      ? threeStars
                      : product.rating === 4
                      ? fourStars
                      : fiveStars}
                  </div>
                </td> */}
                {/* <td className="w-1/6 text-center py-1">{product.stock}</td> */}
                <td className="py-1 line-through text-red-800">
                  Rp{product.price}
                </td>
                <td className="py-1 font-bold text-darkColor">
                  Rp{product.finalPrice}
                </td>
                <td className="text-center py-1">
                  <button
                    onClick={() => navigate(`/cms/details/${product.id}`)}
                  >
                    <MdDescription
                      size={30}
                      className="text-darkColor hover:text-cyan-600 cursor-pointer hover:scale-125 ml-5"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCardContainerCMS;
