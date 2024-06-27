import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  cartReset,
  incrementItemFromCart,
  reduceItemFromCart,
  removeItemFromCart,
} from "../../features/cart/cartSlice";
import { MdArrowBack, MdCheck, MdDelete } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { TbTruckReturn } from "react-icons/tb";

const Cart = () => {
  const { cartItems, isLoading } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (a, c) => a + c.quantity * c.product.price,
    0
  );
  return (
    <section className={styles.section}>
      <div className={`${styles.container} main-container`}>
        <div className="mb-[1.125rem] flex flex-row">
          <button onClick={() => navigate(-1)}>
            <MdArrowBack />
          </button>
          <p className="font-vietnam mb-5 text-nordColor1 font-semibold text-3xl">
            {convertedString}
          </p>
        </div>
        {cartItems.length ? (
          <div className="flex justify-center flex-row overflow-y-auto">
            <div className="m-10 p-10 border-r-2 ">
              <div
                className="flex justify-end"
                onClick={() => dispatch(cartReset())}
              >
                Empty Cart
              </div>
              {cartItems.map((item) => {
                return (
                  <div className="p-10 m-10 flex gap-9 justify-between">
                    <Link
                      to={`/products/${item.product.id}`}
                      className="flex justify-between gap-4"
                    >
                      <img
                        src="w-6 h-6 fit-cover "
                        className={styles.cartCardImage}
                        alt={item.product.title}
                      />
                      <div className="flex gap-5">
                        <div className="max-w-40">
                          <div className="leading-8">{item.product.title}</div>
                          <div className="mb-10 text-2xl">
                            $ {item.product.price}
                          </div>
                          <div className="flex gap-4 w-10 flex-row">
                            <div className="">
                              <TbTruckReturn className="" />
                            </div>
                            <div className="leading-8 text-xl w-8">
                              14 days return available
                            </div>
                          </div>
                          <div className="flex flex-row">
                            <div className="">
                              <MdCheck className="" />
                            </div>
                            <div className="text-xl leading-8 w-8">
                              Delivery by 2 days
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex justify-between items-center">
                      <div className="flex justify-center gap-4 px-4 py-2 border-2 rounded-md">
                        <button
                          className="font-bold bg-transparent text-lg "
                          onClick={() =>
                            dispatch(reduceItemFromCart(item.product))
                          }
                        >
                          -
                        </button>
                        <div className="font-bold bg-transparent text-lg ">
                          {item.quantity}
                        </div>
                        <Button
                          className="font-bold bg-transparent text-lg "
                          onClick={() =>
                            dispatch(incrementItemFromCart(item.product))
                          }
                        >
                          +
                        </Button>
                      </div>
                      <button
                        className="flex justify-end transition-all"
                        onClick={() =>
                          dispatch(removeItemFromCart(item.product.id))
                        }
                      >
                        <MdDelete className={styles.icon} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="ml-4 text-xl">
              <div className="">
                <div className="text-grayText text-xl font-bold mb-2 uppercase">
                  Price Details
                </div>
                <div className="flex justify-between ">
                  <div className="mt-2 mr-2 text-lg font-light">Total MRP</div>
                  <div className="text-lg font-bold">
                    {totalPrice.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between ">
                  <div className="mt-2 mr-2 text-lg font-light">
                    Platform Fee
                  </div>
                  <div className="text-lg font-bold">FREE</div>
                </div>
                <div className="flex justify-between ">
                  <div className="mt-2 mr-2 text-lg font-light">
                    Shipping Fee
                  </div>
                  <div className="text-lg font-bold">FREE</div>
                </div>
              </div>
              <div className="flex justify-between ">
                <div className="mb-8 font-extrabold text-xl">Total Amount</div>
                <div className="mt-8 font-extrabold text-xl">
                  {totalPrice.toFixed(2)}
                </div>
              </div>
              <button className={styles.button}>Place Order</button>
            </div>
          </div>
        ) : (
          <div className="bg-mainColor border-mainColor border-2 text-white px-5 py-4  hover:text-mainColor hover:bg-white">
            No Items Here
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
