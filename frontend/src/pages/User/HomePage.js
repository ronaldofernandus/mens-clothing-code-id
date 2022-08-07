import React, { useEffect, useState } from "react";
import CarouselComponent from "../../components/CarouselComponent";
import ProductCardContainerUser from "../../components/ProductCardContainerUser";
import HighlightProduct from "../../components/HighlightProduct";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductsBySearch,
  getAndFilterProducts,
} from "../../actions/cmsActions";

const HomePage = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
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
  let pageAttribute = `?page=${page}`;

  const [query, setQuery] = useState("");
  const [queryDone, setQueryDone] = useState(false);

  useEffect(() => {
    let pageAttribute = `?page=${page}`;
    dispatch(getAllProducts(pageAttribute));
  }, [page]);

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
    <>
      <CarouselComponent />
      <HighlightProduct />
      <aside className=" flex border-r border-lightColor transform top-0 left-0 w-72 fixed h-screen ease-in-out transition-all duration-300 -translate-x-[285px] hover:translate-x-0">
        <div className="bg-darkColor w-full">
          <div className="mx-auto h-full w-full">
            <ul className="my-2 h-full text-accentColor">
              <li className="py-10 text-2xl flex justify-center items-center"></li>
              <li className="py-10 text-2xl flex justify-center items-center">
                Filter
              </li>
              <hr />
              <li className="pl-2 py-3">Search</li>
              <div className="w-96 flex justify-start pl-2 items-center">
                <input
                  className="rounded  p-2 w-3/5"
                  placeholder="Search"
                  onChange={(e) => setQuery(e.target.value)}
                ></input>
                {queryDone === false ? (
                  <button
                    className="ml-1 p-3 rounded bg-white text-darkColor hover:bg-accentColor hover:text-darkColor"
                    onClick={() => setQueryDone(true)}
                  >
                    <FaSearch />
                  </button>
                ) : (
                  <button
                    className="ml-1 p-3 rounded bg-white text-darkColor hover:bg-accentColor hover:text-darkColor"
                    onClick={() => setQueryDone(false)}
                  >
                    <ImCross />
                  </button>
                )}
              </div>
              <li className="pl-2 py-3">Categories</li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mx-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value={tops}
                  onChange={() => setTops(!tops)}
                />
                <label>Tops</label>
              </li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mx-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value={bottoms}
                  onChange={() => setBottoms(!bottoms)}
                />
                <label>Bottoms</label>
              </li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mx-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value={accessories}
                  onChange={() => setAccessories(!accessories)}
                />
                <label>Accessories</label>
              </li>
              <li className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="mx-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  value={grooming}
                  onChange={() => setGrooming(!grooming)}
                />
                <label>Grooming</label>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <div className="mx-auto md:container">
        {/* <Category /> */}

        <div className="px-24 3xl:px-[73px] flex items-center lg:mt-2 lg:mb-8 justify-between">
          <div className="flex items-center">
            <h1 className="text-xl text-darkColor font-semibold">
              Men's Clothing
            </h1>
            <p className="text-sm text-darkColor ml-3">
              {data.length} products
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
        </div>

        <div className="mb-16">
          {(action === "GET_ALL_PRODUCTS" && status === "data") ||
          (action === "GET_PRODUCTS_BY_SEARCH" && status === "data") ||
          (action === "GET_AND_FILTER_PRODUCTS" && status === "data") ||
          (action === "GET_PRODUCTS_SORT_PRICE" && status === "data") ? (
            <ProductCardContainerUser data={data.data} />
          ) : (
            console.log(action, data)
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
