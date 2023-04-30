import instance from "./instance";

const categoryAPI = {
  listCategory: () => {
    return instance.get("category");
  },
};

export default categoryAPI;
