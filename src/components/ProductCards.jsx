import React from "react";

const ProductCards = ({
  id,
  key,
  title,
  price,
  category,
  description,
  image,
}) => {
  return (
    <div
      key={key}
      className={`bg-white rounded-[20px] pb-2 font-dm border-2 w-full border-nordColor3/30 shadow-md transition ease-in-out delay-150 hover:scale-105 cursor-pointer`}
      onClick={() => {
        navigate(`/products/${String(id)}`);
      }}
    >
      <img
        src={image}
        className={`relative rounded-t-[20px]  h-[15rem] w-full object-contain`}
      />
      <div className=" px-4 py-2 lg:px-4 lg:py-4">
        <div className="flex pb-4 border-b border-nordColor3/30 justify-around items-center">
          <p className="text-nordColor2 text-lg lg:text-xl font-medium flex-1">
            {title}
          </p>
          <button className="border-mainColor border-2 px-2 py-2 h-fit rounded-xl text-mainColor text-sm flex-1/2">
            $ {price}
          </button>
        </div>

        <div className="flex justify-center mt-3">
          <p className="text-grayText text-sm tracking-[-0.5%] max-w-[18rem]">
            {description.slice(0, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;
