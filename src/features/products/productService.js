import axiosConfig from "../../app/axiosConfig";

const getProducts = async () => {
  const response = await axiosConfig.get("products");

  return response.data;
};
const getSingleProduct = async (id) => {
  const response = await axiosConfig.get("products/" + id);

  return response.data;
};
const getCategory = async (data) => {
  const response = await axiosConfig.get("/products/category/" + data);

  return response.data;
};

const productService = {
  getProducts,
  getSingleProduct,
  getCategory,
};

export default productService;
