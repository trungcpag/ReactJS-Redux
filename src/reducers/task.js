import {
  ADD_TASK,
  ADD_TASK_FAILED,
  ADD_TASK_SUCCESS,
  FETCH_TASK,
  FETCH_TASK_FAILED,
  FETCH_TASK_SUCCESS,
  FILTER_TASK_SUCCESS,
  SET_TASK_EDITING,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
} from "../constants/task";
import { toastError } from "../helpers/toastHelper";

const initialState = {
  listTask: [],
  taskEditing: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASK: {
      return {
        ...state,
        listTask: [],
      };
    }
    case FETCH_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data,
      };
    }
    case FETCH_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return state;
    }
    case FILTER_TASK_SUCCESS: {
      return {
        ...state,
        listTask: action.payload.data,
      };
    }
    case ADD_TASK: {
      return {
        ...state,
      };
    }
    case ADD_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: state.listTask.concat(data),
      };
    }
    case ADD_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case SET_TASK_EDITING: {
      const { task } = action.payload;
      return {
        ...state,
        taskEditing: task,
      };
    }
    case UPDATE_TASK: {
      return {
        ...state,
      };
    }
    case UPDATE_TASK_SUCCESS: {
      const { data } = action.payload;
      const { listTask } = state;
      const index = listTask.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listTask.slice(0, index),
          data,
          ...listTask.slice(index + 1),
        ];
        return {
          ...state,
          listTask: newList,
        };
      } else {
        return {
          ...state,
        };
      }
    }
    default:
      return state;
  }
};
export default reducer;
