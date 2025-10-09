import { createAction, handleActions } from 'redux-actions';
import { put, delay, takeEvery, takeLatest } from 'redux-saga/effects';

// #. 액션 타입 정의 : '모듈명/액션명' 형태로 하여 액션명 충돌 방지
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

// #. 액션 생성 함수
//export const increase = () => ({ type: INCREASE });
//export const decrease = () => ({ type: DECREASE });
// #. 액션 생성 함수 redux-actions 로 더 간편하게 생성
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);
// #. 액션 생성 함수의 비동기 함수 redux-saga 로 구현
export const increaseAsync = createAction(INCREASE_ASYNC, () => undefined);
export const decreaseAsync = createAction(DECREASE_ASYNC, () => undefined);

// #. 액션 생성 함수의 비동기 함수
/*export const increaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(increase());
  }, 1000);
};
export const decreaseAsync = () => (dispatch) => {
  setTimeout(() => {
    dispatch(decrease());
  }, 1000);
};*/
// #. 액션 생성 함수의 비동기 함수 redux-saga 로 구현
function* increaseSaga() {
  yield delay(1000); // 1초 기다림
  yield put(increase()); // 특정 액션 디스패치
}
function* decreaseSaga() {
  yield delay(1000); // 1초 기다림
  yield put(decrease()); // 특정 액션 디스패치
}
export function* counterSaga() {
  // 모든 액션을 다 적용 (호출한 것을 누적하여 차례대로 모두 실행)
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  // 기존 진행 중이던 작업이 있으면 취소 처리하고
  // 가장 마지막으로 실행된 것만 적용 (호출한 것을 누적하지 않고 마지막 한번만 실행)
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// #. 초기 상태
const initialState = {
  number: 0,
};

// #. 리듀서 함수
// #. 리듀서 함수 redux-actions 로 더 간편하게 생성 : handleActions(<각 액션 업데이트 함수>, 초기 상태)
const sagaCounter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);

export default sagaCounter;

/**
 * [redux-saga] yarn add redux-saga
 *   리덕스 미들웨어 중 하나로, 비동기 작업을 처리하는데 사용.
 *   제너레이터 함수를 활용하여 비동기 흐름을 보다 쉽게 관리하고, 복잡한 비동기 로직을 간결하게 작성할 수 있게 해줌.
 *   제너레이터 함수는 함수 실행을 일시 중지했다가 필요할 때 다시 시작할 수 있는 특별한 함수.
 *   redux-saga는 이러한 제너레이터 함수를 사용하여 비동기 작업의 흐름을 제어하고, 액션의 디스패치와 상태 업데이트를 관리.
 *   (주요 개념)
 *    1. 사가(Saga) : 제너레이터 함수로 작성되며, 특정 액션이 디스패치될 때 실행되는 비동기 작업을 정의.
 *    2. 이펙트(Effect) : 사가 내부에서 사용하는 객체로, 특정 작업(예: 액션 디스패치, API 호출 등)을 설명.
 *    3. 미들웨어(Middleware) : 리덕스 스토어에 적용되어 액션이 디스패치될 때마다 사가를 실행.
 *   (주요 이펙트)
 *    1. takeEvery : 특정 액션이 디스패치될 때마다 사가를 실행. 모든 액션을 처리.
 *    2. takeLatest : 특정 액션이 디스패치될 때 가장 마지막으로 실행된 사가만 처리. 이전에 실행 중이던 사가는 취소.
 *    3. call : 비동기 함수를 호출할 때 사용. 프로미스를 반환하는 함수와 함께 사용.
 *    4. put : 액션을 디스패치할 때 사용.
 *    5. all : 여러 사가를 동시에 실행할 때 사용.
 *    6. throttle : 특정 시간 간격으로 액션을 처리. 일정 시간 내에 여러 번 디스패치된 액션 중 첫 번째 액션만 처리.
 *       yield throttle(3000, INCREASE_ASYNC, increaseSaga); // 3초에 한번만 실행
 *    (유용한 기능)
 *    1. delay : 일정 시간 지연 후 작업을 수행할 때 사용.
 *    2. select : 현재 리덕스 상태를 조회할 때 사용.
 *       yield put(increase()); // 특정 액션 디스패치
 *       yield select((state) => state.counter.number); // 현재 상태 조회 (state 는 스토어 상태)
 */
