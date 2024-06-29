import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  cartReset,
  incrementItemFromCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../features/carts/cartSlice";
import { MdArrowBack, MdCheck, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { TbTruckReturn } from "react-icons/tb";
import Spinner from "../components/Spinner";

const Cart = () => {
  const { cartItems, isLoading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (a, c) => a + c.quantity * c.product.price,
    0
  );
  if (isLoading)
    return (
      <div className="top-[50%] left-[50%] translate-x-[-50%] absolute h-[100%]">
        <Spinner size={"large"} />
      </div>
    );
  return (
    <section>
      <div className="mb-[1.125rem] flex flex-row gap-2 items-end my-4 w-full">
        <button onClick={() => navigate(-1)}>
          <MdArrowBack className="w-7 h-7" />
        </button>
        <p className=" text-nordColor1 font-semibold text-3xl w-full">
          Your Cart
        </p>
      </div>
      {cartItems.length ? (
        <div className="flex justify-center md:flex-row overflow-y-auto flex-col">
          <div className="md:m-4 md:p-4 md:border-r-2 border-b-2 p-2">
            <div
              className="flex justify-end cursor-pointer hover:text-grayText md:text-black text-grayText mb-4"
              onClick={() => dispatch(cartReset())}
            >
              Empty Cart
            </div>
            {cartItems.map((item) => {
              return (
                <div className="md:p-4 md:m-4 flex gap-9 justify-between flex-col md:flex-row">
                  <Link
                    to={`/products/${item.product.id}`}
                    className="flex justify-between gap-4"
                  >
                    <img
                      src={item.product.image}
                      className="w-72 h-60 object-contain"
                      alt={item.product.title}
                    />
                    <div className="flex gap-5">
                      <div className="max-w-72">
                        <div className="leading-5">{item.product.title}</div>
                        <div className="mb-10 text-2xl">
                          $ {item.product.price}
                        </div>
                        <div className="flex gap-4  flex-row">
                          <div className="">
                            <TbTruckReturn className="w-6 h-6" />
                          </div>
                          <div className=" text-sm ">
                            14 days return available
                          </div>
                        </div>
                        <div className="flex gap-4 flex-row">
                          <div className="">
                            <MdCheck className="w-6 h-6 " />
                          </div>
                          <div className="text-sm">Delivery by 2 days</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="flex justify-between items-center">
                    <div className="flex justify-center gap-2  border-2 rounded-md">
                      <button
                        className="font-bold bg-transparent text-lg hover:bg-slate-200 px-2 py-2"
                        onClick={() =>
                          dispatch(reduceItemFromCart(item.product))
                        }
                      >
                        -
                      </button>
                      <div className="font-bold bg-transparent text-lg py-2">
                        {item.quantity}
                      </div>
                      <button
                        className="font-bold bg-transparent text-lg hover:bg-slate-200 px-2 py-2"
                        onClick={() =>
                          dispatch(incrementItemFromCart(item.product))
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="flex justify-end transition-all"
                      onClick={() =>
                        dispatch(removeItemFromCart(item.product.id))
                      }
                    >
                      <MdDelete className="" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="ml-4 text-xl">
            <div className=" flex gap-3 flex-col">
              <div className="text-grayText text-xl font-bold mb-2 uppercase">
                Price Details
              </div>
              <div className="flex justify-between ">
                <div className=" text-base font-light">Total MRP</div>
                <div className="text-base font-bold">
                  {totalPrice.toFixed(2)}
                </div>
              </div>
              <div className="flex justify-between ">
                <div className=" text-base font-light">Platform Fee</div>
                <div className="text-base font-bold">FREE</div>
              </div>
              <div className="flex justify-between ">
                <div className=" text-base font-light">Shipping Fee</div>
                <div className="text-base font-bold">FREE</div>
              </div>
            </div>
            <div className="flex justify-between text-lg font-medium mt-3">
              <div className="mb-8 ">Total Amount</div>
              <div className="mt-8">$ {totalPrice.toFixed(2)}</div>
            </div>
            <button className="bg-transparent border-mainColor border-2 text-mainColor px-5 py-2  hover:text-white hover:bg-mainColor mt-4">
              Place Order
            </button>
          </div>
        </div>
      ) : (
        <div className="top-[50%] absolute h-[100%] text-grayText ">
          No Items Here
        </div>
      )}
    </section>
  );
};

export default Cart;
