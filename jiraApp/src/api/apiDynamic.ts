import instance from "./instance";

export const apiDynamic = {
  getDatas: (router) => {
    return instance[router.model](`${router.api}`);
  },
  getDataOrRemove: ({ router, id }) => {
    return instance[router.model](`${router.api}/${id}`);
  },
  createData: (router, data) => {
    return instance[router.model](`${router.api}`, data);
  },
  updateData: ({ data, router }) => {
    return instance[router.router.model](
      `${router.router.api}/${data.id}`,
      data
    );
  },
  search: (data) => {
    return instance.get(
      `${data.api}?where={"${data.column}":{"contains":"${data.value}"}}`
    );
  },
};
