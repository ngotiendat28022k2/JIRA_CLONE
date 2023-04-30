import { IProject } from "../interfaces/project";
import instance from "./instance";

const ProjectAPi = {
  listProject: async (): Promise<IProject> => {
    return await instance.get("project");
  },

  readProject: async (id: string): Promise<IProject> => {
    return await instance.get(`project/${id}`);
  },

  removeProject: async (id: string): Promise<IProject> => {
    return await instance.delete(`project/${id}`);
  },

  createProject: async (data: IProject): Promise<IProject> => {
    return await instance.post("project", data);
  },

  upadteProject: async (data: IProject): Promise<IProject> => {
    return await instance.put(`project/${data.id}`, data);
  },
};

export default ProjectAPi;
