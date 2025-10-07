import React, { useCallback } from 'react';
import { connect, useSelector, useDispatch, shallowEqual } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';
import useActions from '../lib/useActions';

/*const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
}) => (
  <Todos
    input={input}
    todos={todos}
    onChangeInput={changeInput}
    onInsert={insert}
    onToggle={toggle}
    onRemove={remove}
  />
);

// #. connect 함수를 사용해 리덕스와 연계된 컴포넌트 반환 (mapStateToProps: state 전달, mapDispatchToProps: store 내장함수 전달)
// #. mapStateToProps: (state) => {...} 또는 ({state 비구조화 할당}) => {...}
// #. mapDispatchToProps: 객체 형태로 전달하면 connect 함수가 내부적으로 bindActionCreators 유틸함수로 액션 생성 함수를 dispatch 로 감싸는 작업을 내부적으로 수행
export default connect(
  ({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }),
  {
    changeInput,
    insert,
    toggle,
    remove,
  },
)(TodosContainer);*/

// #. connect 함수 대신 useSelector, useDispatch Hook 사용하여 connect Hook 대체
const TodosContainer = () => {
  const { input, todos } = useSelector(
    ({ todos }) => ({
      input: todos.input,
      todos: todos.todos,
    }),
    shallowEqual,
  );
  /*// #. useCallback 으로 액션 디스패치 함수 감싸기
  const dispatch = useDispatch();
  const onChangeInput = useCallback(
    (input) => dispatch(changeInput(input)),
    [dispatch],
  );
  const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);*/
  // #. 사용자정의 usActions 유틸 Hook 만들어 사용하기
  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    [],
  );

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default React.memo(TodosContainer);

/**
 * #. 컨테이너 컴포넌트 : 리덕스와 연동되어 있는 컴포넌트로 리덕스로부터 상태를 받아오고 스토어에 액션을 디스패치한다.
 *
 * #. useStore Hooks 를 사용하여 컴포넌트 내부에서 리덕스 스토어 객제 직접 사용 가능. (스토어에 직접접근이 불가피한 경우만 사용 권장)
 *    const store = useStore();
 *    store.dispatch({ type: 'SAMPLE_ACTION' });
 *    store.getState();
 *
 * useActiosns: https://react-redux.js.org/api/hooks#recipe-useactions
 *   액션 생성함수를 액션을 디스패치하는 함수로 변환. (액션 생성 함수를 사용하여 액션 객체를 만들고 이 액션 객체를 스토어에 디스패치하는 작업을 해 주는 함수로 변환)
 *   원래 react-redux 에 내장된 상태로 릴리즈될 계획이었으나 리덕스 개발팀에서 꼭 필요하지 않다고 판단하여 제외된 Hook으로 공식 문서에서 복사하여 사용 가능하도록 코드 제공.
 *   1. 첫번째 파라미터: 액션 생성 함수로 이루어진 배열.
 *   2. 두번째 파라미터: deps 배열이며 이 배열 안에 들어 있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 생성.
 *
 * #. connect vs (useSelector 와 useDispatch)
 *   1. connect 함수를 사용하여 컨테이너 컴포넌트를 만들 경우,
 *      해당 컨테이너 컴포넌트의 부모 컴포넌트가 리랜더링될 때 해당 컴포넌트의 props 가 바뀌지 않은 경우 리렌더링 자동 방지되어 성능 최적화
 *   2. useSelector 와 useDispatch 함수를 사용하여 컨테이너 컴포넌트를 만들 경우,
 *      useSelector 를 사용해 리덕스 상태를 조회할 때는 connect 와 같은 성능 최적화 작업이 자동으로 이루어지지 않으므로
 *      성능 최적화를 위해 React.memo 를 컨테이너 컴포넌트에 사용해 주어야 한다.
 */
