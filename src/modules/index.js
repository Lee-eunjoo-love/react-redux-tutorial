// #. 루트 리듀서
import { combineReducers } from 'redux';
import counter, { counterSaga } from './counter';
import todos from './todos';
import sample, { sampleSaga } from './sample';
import loading from '../lib/loading';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  counter,
  todos,
  sample,
  loading,
});

// #. 루트 사가
export const rootSaga = function* () {
  // all : 여러 사가를 합쳐 주는 역할
  yield all([counterSaga(), sampleSaga()]);
};

export default rootReducer;

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
 */
