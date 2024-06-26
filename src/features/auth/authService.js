import axiosConfig from "../../app/axiosConfig";

const login = async (userData) => {
  const response = await axiosConfig.post("auth/login", userData);

  return response.data;
};

const getUser = async (userId) => {
  const response = await axiosConfig.get(`users/${userId}`);

  if (response.data) {
    localStorage.setItem("userDetails", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("userDetails");
};

const authService = {
  getUser,
  logout,
  login,
};

export default authService;
