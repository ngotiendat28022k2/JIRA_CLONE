import instance from "./instance";

const issueAPi = {
  getIssues: () => {
    return instance.get("/issue");
  },
  getIssue: (id: string) => {
    return instance.get(`issue/${id}`);
  },
  removeIssue: (id: string) => {
    return instance.delete(`issue/${id}`);
  },
  createIssue: (data: any) => {
    return instance.post("issue", data);
  },
  updateIssue: (data: any) => {
    return instance.put(`issue/${data.id}`, data);
  },
  searchIssue: (data: string) => {
    return instance.get(`issues/?search=${data}`);
  },
};

export default issueAPi;
