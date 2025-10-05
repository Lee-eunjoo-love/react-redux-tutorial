import { createAction, handleActions } from 'redux-actions';
// #. 액션 타입 정의 : '모듈명/액션명' 형태로 하여 액션명 충돌 방지
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// #. 액션 생성 함수
//export const increase = () => ({ type: INCREASE });
//export const decrease = () => ({ type: DECREASE });
// #. 액션 생성 함수 redux-actions 로 더 간편하게 생성
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

// #. 초기 상태
const initialState = {
  number: 0,
};

// #. 리듀서 함수
/*function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}*/
// #. 리듀서 함수 redux-actions 로 더 간편하게 생성 : handleActions(<각 액션 업데이트 함수>, 초기 상태)
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);

export default counter;
