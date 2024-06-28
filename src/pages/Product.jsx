import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../features/products/productSlice";
import { addToCart } from "../features/carts/cartSlice";
import { Link } from "react-router-dom";

const Product = () => {
  const { product, isLoading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [isLoadingProduct, setIsLoadingProduct] = useState(false);
  const addToCartHandler = () => {
    setIsLoadingProduct(true);
    console.log("I am adding to cart");
    const cartProduct = {
      quantity: 1,
      product: {
        id: Number(id),
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        category: product.category,
      },
    };
    dispatch(addToCart(cartProduct)).then(() => {
      setIsLoadingProduct(false);
    });
    useEffect(() => {
      dispatch(getSingleProduct(Number(id)));
    }, []);
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-5 relative">
        <div className="flex flex-col flex-1 items-start gap-7">
          <p className="font-vietnam mb-5 text-nordColor1 font-semibold text-3xl">
            {product.title}
          </p>
          <p className="font-normal opacity-70">{product.description}</p>
          <p>
            <b>{product.rating.count}</b> people rated{" "}
            <b>{product.rating.rate}</b>
          </p>
          <div className="flex flex-row ">
            <button
              className="py-3 px-5 border-mainColor border-2 text-mainColor font-medium hover:text-white hover:bg-mainColor"
              onClick={addToCartHandler}
            >
              {isLoadingProduct ? (
                <Spinner className={"addToCartSm"} />
              ) : (
                "Add to Cart"
              )}
            </button>
            <Link className="py-3 px-5 border-mainColor border-2 text-mainColor font-medium hover:text-white hover:bg-mainColor">
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="md:flex-1 items-center w-full">
          <div className=" xl:w-full w-[90%]">
            <img src={product.image} alt="car image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
