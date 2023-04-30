import instance from "./instance";

const deviceAPi = {
  getDevices: () => {
    return instance.get("device");
  },
  getDevice: (id: string) => {
    return instance.get(`device/${id}`);
  },
  removeDevice: (id: string) => {
    return instance.delete(`device/${id}`);
  },
  createDevice: (data: any) => {
    return instance.post("device", data);
  },
  updateDevice: (data: any) => {
    return instance.put(`device/${data.id}`, data);
  },
};

export default deviceAPi;
