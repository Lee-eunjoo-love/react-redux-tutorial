import React, { useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';

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
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));
  const dispatch = useDispatch();
  const onChangeInput = useCallback(
    (input) => dispatch(changeInput(input)),
    [dispatch],
  );
  const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
  const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);

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
 */
