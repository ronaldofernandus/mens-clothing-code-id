import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getActiveBanners } from "../actions/miscActions";
import base_url from "../helpers/base_url";

const CarouselComponent = () => {
  const dispatch = useDispatch();
  const url = base_url;
  const { action, status, data } = useSelector((state) => state.miscReducer);

  useEffect(() => {
    dispatch(getActiveBanners());
  }, [dispatch]);

  return (
    <>
      <Carousel
        showArrows={false}
        showThumbs={true}
        showStatus={false}
        autoPlay={true}
        interval={3000}
        infiniteLoop={true}
        className="w-11/12 mx-auto text-center pt-10"
      >
        {action === "GET_ACTIVE_BANNERS" && status === "data"
          ? data.data.map((banner, index) => {
              return (
                <div key={index}>
                  <img
                    className="object-cover"
                    alt=""
                    src={`${url}/images/${banner.filename}`}
                    style={{ maxHeight: "50vh" }}
                  ></img>
                  <p
                    className="legend"
                    style={{
                      padding: 10,
                      backgroundColor: "rgba(255, 255, 255, 0.81)",
                      color: "#061B31",
                      fontWeight: "bold",
                      fontSize: 18,
                      borderRadius: "0.375rem",
                    }}
                  >
                    {banner.body}
                  </p>
                </div>
              );
            })
          : console.log(data)}
      </Carousel>
    </>
  );
};

export default CarouselComponent;
