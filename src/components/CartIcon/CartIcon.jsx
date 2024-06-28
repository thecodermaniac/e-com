import { useEffect, useState } from "react";
import { CgShoppingBag } from "react-icons/cg";
import { useAppSelector } from "../../app/hooks";
import "./cartIcon.css";

const CartIcon = () => {
  const { totalItems, status } = useAppSelector((state) => state.cart);

  const [bump, setBump] = useState(false);

  const iconStyles = bump
    ? "bump flex items-center p-2.5 rounded-full hover:bg-back-c-highlight"
    : "flex items-center p-2.5 rounded-full hover:bg-back-c-highlight";

  console.log(totalItems, status);
  const totalQuantity = totalItems;
  const amountStyles =
    totalQuantity === 0
      ? "hidden"
      : "relative top-0 right-0 w-0 h-0 text-[#ff5a1e] bg-back-c-detail";

  useEffect(() => {
    if (totalQuantity === 0) {
      return;
    } else {
      setBump(true);
    }

    const timer = setTimeout(() => {
      setBump(false);
    }, 150);

    return () => {
      clearTimeout(timer);
    };
  }, [totalQuantity]);

  return (
    <div className={iconStyles}>
      <CgShoppingBag />
      <div className={amountStyles}>
        <div>{totalQuantity}</div>
      </div>
    </div>
  );
};

export default CartIcon;
