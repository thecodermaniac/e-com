import React from "react";

const Spinner = ({ size }) => {
  switch (size) {
    case "small":
      return (
        <div className="flex justify-center items-center">
          <div
            className={`border-gray-200 border-t-mainColor border-2 w-7 h-7 rounded-full animate-spin`}
          >
            {" "}
          </div>
        </div>
      );
    case "large":
      return (
        <div className="flex justify-center items-center">
          <div
            className={`border-gray-200 border-t-mainColor border-2 w-12 h-12 rounded-full animate-spin`}
          >
            {" "}
          </div>
        </div>
      );
    default:
      return (
        <div className="flex justify-center items-center">
          <div
            className={`border-gray-200 border-t-mainColor border-2 w-9 h-9 rounded-full animate-spin`}
          >
            {" "}
          </div>
        </div>
      );
  }
};

export default Spinner;
