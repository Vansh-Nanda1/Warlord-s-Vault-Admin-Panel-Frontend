import { Endpoints } from "../constant/apiEndPoints";
import { api } from "./api";

export const Login = async (payload) => {
  return await api.post(Endpoints.LogIn, payload, { withCredentials: true });
};

export const logout = async () => {
  return await api.post(Endpoints.logout, { withCredentials: true });
};

export const CreateCategory = async (payload, token) => {
  return await api.post(Endpoints.CreateCategory, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const GetAllCategory = async () => {
  return await api.get(Endpoints.GetAllCategory);
};

export const DeleteCategory = async (id, token) => {
  return await api.delete(`${Endpoints.DeleteCategory}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const UpdateCategory = async (id, token, payload) => {
  return await api.put(`${Endpoints.UpdateCategory}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const CreateSubCategory = async (payload, token, id) => {
  return await api.post(`${Endpoints.CreateSubCategory}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
};

export const UpdateSubCategory = async (id, token, payload) => {
  return await api.put(`${Endpoints.UpdateSubCategory}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetAllProduct = async (page = 1, limit = 10) => {
  return await api.get(`${Endpoints.GetAllProduct}?page=${page}&limit=${limit}`);
};

export const CreateProduct = async (payload, token) => {
  return await api.post(`${Endpoints.CreateProduct}`, payload, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
      imageType : "productPicture"
    },
    withCredentials: true,
  });
};

export const GetAllOrder = async (page = 1, limit = 10, token) => {
  return await api.get(`${Endpoints.GetAllOrder}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetAllCustomer = async (page = 1, limit = 10, token) => {
  return await api.get(`${Endpoints.GetAllCustomer}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetDashboardDetails = async (token) => {
  return await api.get(`${Endpoints.GetDashboardDetails}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const GetAllAuction = async (token) => {
  return await api.get(`${Endpoints.GetAllAuction}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const CreateAuction = async (payload, token) => {
  return await api.post(`${Endpoints.CreateAuction}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const UpdateAuction = async (payload, token, id) => {
  return await api.patch(`${Endpoints.UpdateAuction}/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}