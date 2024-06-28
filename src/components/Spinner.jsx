const Spinner = ({ className, size = "default" }) => {
  let sizeClasses;
  switch (size) {
    case "addToCart":
      sizeClasses = "w-8 h-8 md:w-12 md:h-12 border-5";
      break;
    case "addToCartSm":
      sizeClasses = "w-8 h-8 border-5";
      break;
    default:
      sizeClasses = "w-20 h-20 border-10";
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div
        className={`${sizeClasses} border-gray-200 border-t-blue-500 rounded-full animate-spin`}
      ></div>
    </div>
  );
};
