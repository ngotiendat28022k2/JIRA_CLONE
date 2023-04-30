import instance from "./instance";

export const pageApi = {
  getPages: () => {
    return instance.get(`page`);
  },
  getPage: (id) => {
    return instance.get(`page/${id}`);
  },
  createPage: (data) => {
    return instance.post(`page`, data);
  },
  removePage: (id) => {
    return instance.delete(`page/${id}`);
  },
  updatePage: (data) => {
    return instance.put(`page/${data.id}`, data);
  },
};
