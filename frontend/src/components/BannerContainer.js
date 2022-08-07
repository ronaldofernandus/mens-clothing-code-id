import React from "react";
import { useNavigate } from "react-router-dom";
import base_url from "../helpers/base_url";
import Swal from "sweetalert2";

import { MdDescription } from "react-icons/md";

const BannerContainer = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const url = base_url;

  return (
    <div>
      <table className="table-fixed">
        <thead>
          <tr className="h-20 uppercase text-left">
            <th colSpan="2" className="text-center">
              Banner
            </th>
            <th className="text-center">Caption</th>
            <th className="text-center">Status</th>
            <th className="text-right">Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((banner, index) => {
            return (
              <tr key={index}>
                <td className="pr-5 py-1">{index + 1}.</td>
                <td className="w-3/6 py-1">
                  <div>
                    <img
                      className="w-[400px] h-[200px] hover:shadow-xl cursor-pointer object-cover"
                      alt=""
                      // src={banner.filename}
                      src={`${url}/images/${banner.filename}`}
                      onClick={() =>
                        Swal.fire({
                          width: 1000,
                          imageUrl: url + "/images/" + banner.filename,
                          imageHeight: 500,
                        })
                      }
                    />
                  </div>
                </td>
                <td className="w-2/6 py-1 text-center font-bold text-darkColor">
                  {banner.body}
                </td>
                {banner.active === true ? (
                  <td className="w-1/6 text-center py-1 text-green-700 font-extrabold">
                    ACTIVE
                  </td>
                ) : (
                  <td className="w-1/6 text-center py-1 text-red-700 font-extrabold">
                    INACTIVE
                  </td>
                )}

                <td className="w-2/6 py-1">
                  <button
                    onClick={() => navigate(`/cms/bannerDetails/${banner.id}`)}
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

export default BannerContainer;
