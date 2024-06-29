import React, { useEffect, useState } from "react";
import { navData } from "./Navbar/NavLinks";
import { getProducts, getCategory } from "../features/products/productSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ROUTES } from "../constants/Routes";
import ProductCards from "./ProductCards";
import { Link } from "react-router-dom";

const QuickView = () => {
  const { products } = useAppSelector((state) => state.product);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useAppDispatch();
  const handleCategory = (e) => {
    const target = e.target;
    setSelectedCategory(target.id);
    if (target.value !== "all") {
      const pathUrl = ROUTES.filter((item) => {
        return item.name.toLowerCase() === target.value.toLowerCase();
      });
      dispatch(getCategory(pathUrl[0].url.toLowerCase()));
    } else {
      dispatch(getProducts());
    }
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <section>
      <p className="text-3xl font-bold my-6">Quick View</p>
      <div className="flex justify-between items-center overflow-x-auto">
        <div className="flex items-center justify-between gap-4">
          {navData?.map((item) => {
            return (
              <div>
                <input
                  type="radio"
                  id={item.name}
                  name="category"
                  value={item.value}
                  className="hidden peer"
                  onClick={(e) => handleCategory(e)}
                />
                <label
                  className="border-secondColor px-5 py-4 hover:bg-mainColor text-mainColor hover:text-white rounded-xl border-2 peer-checked:bg-mainColor peer-checked:text-white"
                  htmlFor={item.name}
                >
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
        <Link
          to={`/catalog/${String(selectedCategory)}`}
          className="flex justify-center items-center"
        >
          <div className="text-base md:text-2xl font-thin border-mainColor text-mainColor px-5 py-4  hover:text-grayText">
            View More
          </div>
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-12 my-10 w-full ">
        {products?.slice(0, 9)?.map((product, index) => (
          <ProductCards
            id={product.id}
            key={index}
            title={product.title}
            price={product.price}
            category={product.category}
            description={product.description}
            image={product.image}
          />
        ))}
      </div>
    </section>
  );
};

export default QuickView;
