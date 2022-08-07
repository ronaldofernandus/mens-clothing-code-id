import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { ProductCardContainerCMS } from "../../components/";
import { GiLoincloth } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductsBySearch,
  getAndFilterProducts,
} from "../../actions/cmsActions";
import { RiTShirtAirFill } from "react-icons/ri";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import "tw-elements";

const CMSDashboard = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [tops, setTops] = useState(false);
  const [bottoms, setBottoms] = useState(false);
  const [accessories, setAccessories] = useState(false);
  const [grooming, setGrooming] = useState(false);
  const [filterArr, setFilterArr] = useState([]);
  const [sortAttr, setSortAttr] = useState("");
  const [sorter, setSorter] = useState("");
  const [order, setOrder] = useState("");
  const [showModal, setShowModal] = useState(false);
  let pageAttribute = `?page=${page}&limit=10`;

  useEffect(() => {
    if (tops === true) {
      setFilterArr([...filterArr, "tops"]);
    } else {
      setFilterArr(filterArr.filter((data) => data !== "tops"));
    }
  }, [tops]);

  useEffect(() => {
    if (tops === true) {
      setFilterArr([...filterArr, "tops"]);
    } else {
      setFilterArr(filterArr.filter((data) => data !== "tops"));
    }
  }, [tops]);

  useEffect(() => {
    if (bottoms === true) {
      setFilterArr([...filterArr, "bottoms"]);
    } else {
      setFilterArr(filterArr.filter((data) => data !== "bottoms"));
    }
  }, [bottoms]);

  useEffect(() => {
    if (accessories === true) {
      setFilterArr([...filterArr, "accessories"]);
    } else {
      setFilterArr(filterArr.filter((data) => data !== "accessories"));
    }
  }, [accessories]);

  useEffect(() => {
    if (grooming === true) {
      setFilterArr([...filterArr, "grooming"]);
    } else {
      setFilterArr(filterArr.filter((data) => data !== "grooming"));
    }
  }, [grooming]);

  useEffect(() => {
    if (sortAttr === "az") {
      setSorter("name");
      setOrder("asc");
    }
    if (sortAttr === "za") {
      setSorter("name");
      setOrder("desc");
    }
    if (sortAttr === "highToLow") {
      setSorter("price");
      setOrder("desc");
    }
    if (sortAttr === "lowToHigh") {
      setSorter("price");
      setOrder("asc");
    }
  }, [sortAttr]);

  useEffect(() => {
    dispatch(getAllProducts(pageAttribute));
  }, [page]);

  const [query, setQuery] = useState("");
  const [queryDone, setQueryDone] = useState(false);

  useEffect(() => {
    let searchAttribute = `${pageAttribute}&sorter=${sorter}&order=${order}&search=${query}`;
    console.log(filterArr);
    if (queryDone === true && filterArr.length === 0) {
      dispatch(getProductsBySearch(searchAttribute));
    } else if (queryDone === true && filterArr.length > 0) {
      dispatch(getAndFilterProducts(searchAttribute, filterArr));
    } else {
      dispatch(getAllProducts(pageAttribute));
    }
  }, [queryDone]);

  return (
    <div className="px-10 lg:px-32 lg:ml-52 3xl:ml-12">
      <div className="flex items-center justify-between p-4 mb-2">
        <div className="mt-3 shadow-sm">
          <a href="" className="flex items-center">
            <GiLoincloth className="text-3xl text-darkColor mr-2 " />
            <span className="lg:text-3xl name-com font-extrabold text-transparent text-8xl bg-clip-text bg-darkColor">
              MEN'S CLOTHING
            </span>
          </a>
        </div>
        <div className="flex">
          <input
            className="rounded mt-6 p-2 w-full search outline-1 outline-lightColor"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          {queryDone === false ? (
            <button
              className="ml-1 mt-6 p-3 rounded bg-white text-lightColor hover:bg-darkColor hover:text-white"
              onClick={() => setQueryDone(true)}
            >
              <FaSearch />
            </button>
          ) : (
            <button
              className="ml-1 mt-6 p-3 rounded bg-white text-lightColor hover:bg-darkColor hover:text-white"
              onClick={() => setQueryDone(false)}
            >
              <ImCross />
            </button>
          )}
        </div>
      </div>

      <div className="solid"></div>

      <div className="p-3 flex justify-end">
        <div className="flex flex-col space-x-2 p-3  rounded w-fit ">
          <div className="space-x-3">
            <button
              className=" text-base rounded-md border-bottom text-lightColor border-0 px-3 bg-gray-200 font-semibold "
              onClick={() => setQueryDone(false)}
            >
              All
            </button>
            <input
              type="checkbox"
              value={tops}
              onChange={() => setTops(!tops)}
            />
            <label className="text-base text-lightColor font-semibold">
              Tops
            </label>

            <input
              type="checkbox"
              value={bottoms}
              onChange={() => setBottoms(!bottoms)}
            />
            <label className="text-base text-lightColor font-semibold">
              Bottoms
            </label>

            <input
              type="checkbox"
              value={accessories}
              onChange={() => setAccessories(!accessories)}
            />
            <label className="text-base text-lightColor font-semibold">
              Accessories
            </label>

            <input
              type="checkbox"
              value={grooming}
              onChange={() => setGrooming(!grooming)}
            />
            <label className="text-base text-lightColor font-semibold">
              Grooming
            </label>
          </div>
        </div>
      </div>
      <div className="solid"></div>

      <div className=" m-2 mt-6">
        <h1 className="text-xl text-darkColor uppercase"> Products List</h1>
        <p className="text-thin text-gray-400 mt-2 mb-3">
          You can select and customize one of <br></br> your product
        </p>
      </div>
      <div className="flex justify-end space-x-10">
        <div className="flex items-center">
          <label className=" text-darkColor text-sm mr-4">Sort: </label>
          <select
            className="border hover:border-cyan-800 focus:border-cyan-900 w-full rounded-md bg-white py-1 px-4 text-darkColor text-sm"
            name="condition"
            id="condition"
            value={sortAttr}
            onChange={(e) => setSortAttr(e.target.value)}
          >
            {/* <option value="featured">Featured</option> */}
            <option value="lowToHigh">Price : Low to High</option>
            <option value="highToLow">Price : High to Low</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </div>

        <div className="text-4xl flex justify-center items-center ">
          {data.page > 1 ? (
            <button onClick={() => setPage(page - 1)}>
              <MdKeyboardArrowLeft className="text-gray-400" />
            </button>
          ) : (
            ""
          )}
          <p className="text-sm">{data.page}</p>
          {data.page < data.totalPage ? (
            <button onClick={() => setPage(page + 1)}>
              <MdKeyboardArrowRight className="text-darkColor cursor-pointer" />
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {/* card */}
      <div className="">
        {(action === "GET_ALL_PRODUCTS" && status === "data") ||
        (action === "GET_PRODUCTS_BY_SEARCH" && status === "data") ||
        (action === "GET_AND_FILTER_PRODUCTS" && status === "data") ? (
          <ProductCardContainerCMS data={data.data} />
        ) : (
          console.log(action, data)
        )}
      </div>

      <div className="fixed right-28 bottom-9">
        <button
          className="text-darkColor hover:text-cyan-600"
          onClick={() => setShowModal(true)}
        >
          <div className="flex">
            <IoMdAddCircle size={50} />
            <h1 className="text-base rounded-md font-bold pt-3 pl-1">
              PRODUCTS
            </h1>
          </div>
        </button>
      </div>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-darkColor outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-white">
                    Please Select
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-white opacity-5 float-right text-3xl leading-none outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    {" "}
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-accentColor text-darkColor active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => navigate("/cms/add/one_product")}
                  >
                    One Product
                  </button>
                  <button
                    className="bg-accentColor text-darkColor active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => navigate("/cms/add/many_product")}
                  >
                    Many Products
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
};

export default CMSDashboard;
