import { handleActions } from 'redux-actions';
import * as api from '../lib/api';

// #. 액션 타입 (요청당 3개씩)
const GET_POST = 'sample/GET_POST';
const GET_POST_SUCCESS = `sample/GET_POST_SUCCESS`;
const GET_POST_FAILURE = `sample/GET_POST_FAILURE`;

const GET_USERS = 'sample/GET_USERS';
const GET_USERS_SUCCESS = `sample/GET_USERS_SUCCESS`;
const GET_USERS_FAILURE = `sample/GET_USERS_FAILURE`;

// #. 액션 함수 생성
export const getPost = (id) => async (dispatch) => {
  dispatch({ type: GET_POST });
  try {
    const response = await api.getPost(id);
    dispatch({
      type: GET_POST_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_POST_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

export const getUsers = () => async (dispatch) => {
  dispatch({ type: GET_USERS });
  try {
    const response = await api.getUsers();
    dispatch({
      type: GET_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (e) {
    dispatch({
      type: GET_USERS_FAILURE,
      payload: e,
      error: true,
    });
    throw e;
  }
};

// #. 상태 초기 설정
const initialState = {
  loading: {
    GET_POST: false,
    GET_USERS: false,
  },
  post: null,
  users: null,
};
console.log('initialState', JSON.stringify(initialState));

// #. 리듀서 함수 (2개 이상의 액션 처리 : handleAction -> handleActions)
const sample = handleActions(
  {
    [GET_POST]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: true, // #. 요청 시작
      },
    }),
    [GET_POST_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, // #. 요청 완료
      },
      post: action.payload,
    }),
    [GET_POST_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_POST: false, // #. 요청 완료
      },
    }),
    [GET_USERS]: (state) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: true, // #. 요청 시작
      },
    }),
    [GET_USERS_SUCCESS]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false, // #. 요청 완료
      },
      users: action.payload,
    }),
    [GET_USERS_FAILURE]: (state, action) => ({
      ...state,
      loading: {
        ...state.loading,
        GET_USERS: false, // #. 요청 완료
      },
    }),
  },
  initialState,
);

export default sample;
