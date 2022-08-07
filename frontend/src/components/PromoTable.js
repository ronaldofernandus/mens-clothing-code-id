import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import intToRupiah from "../helpers/rupiah";
import { MdEventNote } from "react-icons/md";
import PromoEdit from "../components/PromoEdit";
import { getPromos, getPromoById } from "../actions/promoActions";
import { useDispatch, useSelector } from "react-redux";

const PromoTable = (props) => {
  const { actionPromo, statusPromo, dataPromo } = useSelector((state) => state.promoReducer);
  const dispatch = useDispatch();
  const promos = props.dataPromo;
  const [showPromoEdit, setShowPromoEdit] = useState(false);
  const [clickedId, setClickedId] = useState(0);

  useEffect(() => {
    console.log(dataPromo);
  }, [statusPromo]);

  return (
    <div>
      <div className="w-full text-sm lg:text-base" cellSpacing="0">
        {/* <thead> */}
        <div className="h-12 uppercase grid grid-cols-11 font-bold">
          <div className="text-right text-darkColor">No</div>

          <div className="md:visible invisible text-right text-darkColor col-span-2">
            Promo Name
          </div>
          <div className="lg:text-right text-left text-darkColor col-span-2">
            {"Discount (%)"}
          </div>
          <div className="text-right text-darkColor col-span-3">Start Date</div>
          <div className="text-right text-darkColor col-span-3">End Date</div>
        </div>
        {/* </thead> */}
        {/* <tbody> */}
        {showPromoEdit && clickedId != 0 ? (
          <PromoEdit
            id={clickedId}
            // formPromo={formPromo}
            // setFormPromo={setFormPromo}
            setShowPromoEdit={setShowPromoEdit}
          />
        ) : (
          ""
        )}
        {promos
          ? promos.map((promo, index) => {
            return (
              <div key={index}>
                <div
                  className="border bg-gray-50 hover:bg-white relative cursor-pointer grid grid-cols-11"
                  onClick={
                    () => {
                      // editHandler(promo.id)
                      setShowPromoEdit(true);
                      setClickedId(promo.id);
                    }
                    // navigate("/user/orderDetail/" + order.id)
                  }
                >
                  <div className="pb-4 md:table-cell p-2 text-right ">
                    <Link to="#">
                      <p className="md:table-cell text-midColor">
                        {index + 1}.
                      </p>
                    </Link>
                  </div>
                  <div className="text-right md:table-cell pb-3 p-2 col-span-2">
                    <span className="text-sm lg:text-base text-midColor fot-medium">
                      {promo.nama_promo}
                    </span>
                  </div>
                  <div className="p-2 text-right md:table-cell pb-3 col-span-2">
                    <span className="text-sm lg:text-base font-medium text-midColor ">
                      {promo.potongan_harga}
                    </span>
                  </div>

                  <div className="text-right md:table-cell pb-3 p-2 col-span-3">
                    <span className="text-sm lg:text-base font-medium text-midColor">
                      {String(promo.tgl_mulai).slice(0, 10)}
                    </span>
                  </div>

                  <div className="text-right md:table-cell pb-3 p-2 col-span-3">
                    <span className="text-sm lg:text-base">
                      {String(promo.tgl_akhir).slice(0, 10)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
          : console.log(dataPromo)}
        {/* </tbody> */}
      </div>
    </div>
  );
};

export default PromoTable;
