import React from "react";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { navData } from "../components/Navbar/NavLinks";
import { ROUTES } from "../constants/Routes";
import ProductCards from "../components/ProductCards";
import { getCategory, getProducts } from "../features/products/productSlice";
import { MdArrowBack } from "react-icons/md";

const Catalog = () => {
  let { id } = useParams();
  const { products, isLoading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id) {
      const newUrl = window.location.pathname + "/All";
      window.history.pushState({ path: newUrl }, "", newUrl);

      id = "All";
    }

    const category = [
      ...navData.filter((item) => {
        return item.name === id?.toString();
      }),
    ];
    if (category[0].value !== "all") {
      const pathUrl = ROUTES.filter((item) => {
        return item.name.toLowerCase() === category[0].value.toLowerCase();
      });
      dispatch(getCategory(pathUrl[0].url.toLowerCase()));
    } else {
      dispatch(getProducts());
    }
  }, [id]);

  const convertedString = id
    ?.split("-")
    ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1))
    ?.join(" ");
  return (
    <div>
      <div className="mb-[1.125rem] flex flex-row gap-2 items-end my-4 w-full">
        <button onClick={() => navigate(-1)}>
          <MdArrowBack className="w-7 h-7" />
        </button>
        <p className="text-nordColor1 font-semibold text-3xl w-full">
          {convertedString}
        </p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-12 my-10 w-full ">
        {products?.map((product, index) => (
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
    </div>
  );
};

export default Catalog;
