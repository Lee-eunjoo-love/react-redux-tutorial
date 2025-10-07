const loggerMiddleware = (store) => (next) => (action) => {
  // #. 액션 타입으로 log 그룹화
  console.group(action && action.type);
  console.log('이전 상태', store.getState());
  console.log('액션', action);
  next(action);
  console.log('다음 상태', store.getState());
  // #. 그룹 끝
  console.groupEnd();
};

export default loggerMiddleware;

/**
 * 리덕스 미들웨어 :
 *   액션과 리듀서 사이에서 액션을 디스패치했을 때 리듀서에서 이를 처리하기 전에 지정된 작업들을 실행.
 *   함수를 반환하는 함수를 반환하는 함수.
 *   1. store: 리덕스 스토어 인스턴스
 *      store.dispatch 를 사용하면 첫 번째 미들웨어부터 다시 처리.
 *   2. next: 함수 형태.
 *     next(action) 을 호출하면
 *     다음 처리해야 할 미들웨어가 존재하면 다음 처리해야 할 미들웨어에게 액션을 넘겨주고
 *     다음 처리해야 할 미들웨어가 존재하지 않으면 리듀서에게 액션을 넘겨준다.
 *     미들웨어에서 next를 사용하지 않으면 액션이 리듀서에게 전달되지 않아 액션이 무시된다.
 */
