import taskApis from "../apis/taskApi";

import {
  ADD_TASK,
  ADD_TASK_FAILED,
  ADD_TASK_SUCCESS,
  FETCH_TASK,
  FETCH_TASK_FAILED,
  FETCH_TASK_SUCCESS,
  FILTER_TASK,
  FILTER_TASK_SUCCESS,
  SET_TASK_EDITING,
  UPDATE_TASK,
  UPDATE_TASK_FAILED,
  UPDATE_TASK_SUCCESS,
} from "../constants/task";

export const fetchListTask = (params = {}) => {
  return {
    type: FETCH_TASK,
    payload: {
      params,
    },
  };
};

export const fetchListTaskSuccess = (data) => {
  return {
    type: FETCH_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListTaskFailed = (error) => {
  return {
    type: FETCH_TASK_FAILED,
    payload: {
      error,
    },
  };
};

export const fetchListTaskRequest = () => {
  return (dispatch) => {
    dispatch(fetchListTask());
    taskApis
      .getAll()
      .then((response) => {
        console.log(response);
        const { data } = response;
        dispatch(fetchListTaskSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchListTaskFailed(error));
      });
  };
};

export const filterTask = (keyword) => {
  return {
    type: FILTER_TASK,
    payload: {
      keyword,
    },
  };
};

export const filterTaskSuccess = (data) => {
  return {
    type: FILTER_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addTask = (title, description) => {
  return {
    type: ADD_TASK,
    payload: {
      title,
      description,
    },
  };
};

export const addTaskSuccess = (data) => {
  return {
    type: ADD_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addTaskFailed = (error) => {
  return {
    type: ADD_TASK_FAILED,
    payload: {
      error,
    },
  };
};

export const setTaskEditing = (task) => {
  return {
    type: SET_TASK_EDITING,
    payload: {
      task,
    },
  };
};

export const updateTask = (title, description, status = 0) => {
  return {
    type: UPDATE_TASK,
    payload: {
      title,
      description,
      status,
    },
  };
};

export const updateTaskSuccess = (data) => {
  return {
    type: UPDATE_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateTaskFailed = (error) => {
  return {
    type: UPDATE_TASK_FAILED,
    payload: {
      error,
    },
  };
};
