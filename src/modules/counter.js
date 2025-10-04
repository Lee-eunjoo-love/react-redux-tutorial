// #. 액션 타입 정의 : '모듈명/액션명' 형태로 하여 액션명 충돌 방지
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// #. 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

// #. 초기 상태
const initialState = {
  number: 0,
};

// #. 리듀서 함수
function counter(state = initialState, action) {
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
}

export default counter;
