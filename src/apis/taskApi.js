import axiosClient from "./axiosClient";

const taskApi = {
  getAll: (params) => {
    const url = "tasks";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `tasks/${id}`;
    return axiosClient.get(url);
  },
  addTask: (data) => {
    const url = "tasks";
    return axiosClient.post(url, data);
  },
  updateTask: (data, taskId) => {
    const url = `tasks/${taskId}`;
    return axiosClient.put(url, data);
  },
};

export default taskApi;
