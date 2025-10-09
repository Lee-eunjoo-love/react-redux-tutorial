import { createAction, handleActions } from 'redux-actions';
import * as api from '../lib/api';
//import createRequestThunk from '../lib/createRequestThunk';
import { call, put, takeLatest } from 'redux-saga/effects';
//import { startLoading, finishLoading } from '../lib/loading';
import createRequestSaga from '../lib/createRequestSaga';

const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = 'sample/GET_POST_SUCCESS';
//const GET_POST_FAILURE = 'sample/GET_POST_FAILURE';

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = 'sample/GET_USERS_SUCCESS';
//const GET_USERS_FAILURE = 'sample/GET_USERS_FAILURE';

/*export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST }); // 요청 시작
  try {
    const response = await api.getPost(id);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data,
    }); // 요청 성공
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    }); // 요청 실패
    throw e; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS }); // 요청 시작
  try {
    const response = await api.getUsers();
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    }); // 요청 성공
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    }); // 요청 실패
    throw e; // 나중에 컴포넌트단에서 에러를 조회할 수 있게 해 줌
  }
};*/
// #. 리팩토링 createRequestThunk 사용
/*export const getPost = createRequestThunk(GET_POST, api.getPost);
export const getUsers = createRequestThunk(GET_USERS, api.getUsers);*/
// #. 리팩토링 redux-saga 사용
export const getPost = createAction(GET_POST, (id) => id);
export const getUsers = createAction(GET_USERS);
// #. 리팩토링 redux-saga 사용 (thunk 미사용)
export const getPostSaga = createRequestSaga(GET_POST, api.getPost);
export const getUsersSaga = createRequestSaga(GET_USERS, api.getUsers);

/*function* getPostSaga(action) {
  yield put(startLoading(GET_POST));
  try {
    const response = yield call(api.getPost, action.payload);
    yield put({
      type: GET_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_POST));
}

function* getUsersSaga() {
  yield put(startLoading(GET_USERS));
  try {
    const response = yield call(api.getUsers);
    yield put({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    yield put({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(GET_USERS));
}

export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}*/

// #. 리팩토링 redux-saga 사용 (thunk 미사용)
export function* sampleSaga() {
  yield takeLatest(GET_POST, getPostSaga);
  yield takeLatest(GET_USERS, getUsersSaga);
}

const initialState = {
  post: null,
  users: null,
  error: null,
};

const sample = handleActions(
  {
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      post: action.payload, // 결과 넣기
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      users: action.payload, // 결과 넣기
    }),
  },
  initialState,
);

export default sample;
