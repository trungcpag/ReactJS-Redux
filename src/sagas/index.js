import {
  fork,
  take,
  call,
  delay,
  put,
  takeLatest,
  takeEvery,
  select,
} from "redux-saga/effects";
import { hideModal } from "../actions/modal";
import {
  addTaskFailed,
  addTaskSuccess,
  fetchListTask,
  fetchListTaskFailed,
  fetchListTaskSuccess,
  updateTaskFailed,
  updateTaskSuccess,
} from "../actions/task";
import { hideLoading, showLoading } from "../actions/ui";
import taskApi from "../apis/taskApi";
import { STATE_CODE, STATUES } from "../constants";

import * as taskType from "./../constants/task";

function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskType.FETCH_TASK);
    yield put(showLoading());
    const { payload } = action;
    const { params } = payload;
    const resp = yield call(taskApi.getAll, params);
    if (resp.status === STATE_CODE.SUCCESS) {
      yield put(fetchListTaskSuccess(resp.data));
    } else {
      yield put(fetchListTaskFailed(resp.data));
    }

    yield delay(100);
    yield put(hideLoading());
  }
}

function* filerTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  yield put(fetchListTask({ q: keyword }));
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload;
  yield put(showLoading());
  const resp = yield call(taskApi.addTask, {
    title,
    description,
    status: STATUES[0].value,
  });

  if (resp.status === STATE_CODE.CREATED) {
    yield put(addTaskSuccess(resp.data));
    yield put(hideModal());
  } else {
    yield put(addTaskFailed(resp.data));
  }
  yield delay(100);
  yield put(hideLoading());
}

function* updateStateSage({ payload }) {
  const { title, description, status } = payload;
  const statusInt = parseInt(status);
  const taskEditing = yield select((state) => state.task.taskEditing);
  yield put(showLoading());
  const resq = yield call(
    taskApi.updateTask,
    { title, description, status: statusInt },
    taskEditing.id
  );
  if (resq.status === STATE_CODE.SUCCESS) {
    yield put(updateTaskSuccess(resq.data));
    yield put(hideModal());
  } else {
    yield put(updateTaskFailed(resq.data));
  }
  yield delay(100);
  yield put(hideLoading());
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskType.FILTER_TASK, filerTaskSaga);
  yield takeEvery(taskType.ADD_TASK, addTaskSaga);
  yield takeLatest(taskType.UPDATE_TASK, updateStateSage);
}

export default rootSaga;
