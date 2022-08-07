import React from "react";

function TrackingPage() {
  let data = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="grid grid-cols-2">
      <div className="p-10 space-y-5">
        <div className="text-4xl font-bold">Lacak</div>
        <div>
          <div className="grid grid-cols-2">
            <div className="">Kurir:</div>
            <div className="font-semibold text-2xl">SiCepat</div>
          </div>
          <div className="grid grid-cols-2">
            <div className="">Layanan:</div>
            <div className="font-semibold text-2xl">Sameday</div>
          </div>
        </div>
        <hr />
        <div>
          <div className="">Nomor Resi</div>
          <div className="font-semibold text-2xl">0023403485748</div>
        </div>
        <hr />
        <div className="space-y-5">
          <div className="">
            <div className="">Pengirim:</div>
            <div className="font-semibold text-2xl">MEN'S CLOTHING</div>
            <div>Jakarta Utara</div>
          </div>
          <div className="">
            <div className="">Pembeli:</div>
            <div className="font-semibold text-2xl">Arif Budiman</div>
            <div>Jawa Timur</div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200">
        <div className="text-center text-3xl  mt-10">
          <p>Status: Pesanan Tiba</p>
        </div>
        <div className="bg-white w-9/12 rounded-md p-5 mb-10 mx-auto">
          {data.map((history, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-3 px-10 m-10 rounded-md"
              >
                <div>17:38 07 Oct</div>
                <div className="col-span-2">
                  {"Paket diterima oleh [Fifah - (Kel) Keluarga Serumah]"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TrackingPage;
