import axios from "axios";

const BASE_URL = "https://reqres.in/api";

export const getUsers = async (paginationData) => {
  const response = await axios.get(`${BASE_URL}/users`, {
    params: { page: paginationData.page, per_page: paginationData.perPage },
  });

  return response.data;
};

export const deleteUser = async (userId) => {
  await axios.delete(`${BASE_URL}/users/${userId}`);
};
