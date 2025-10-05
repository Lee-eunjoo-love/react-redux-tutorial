const TodoItem = ({ todo, onToggle, onRemove }) => {
  return (
    <div>
      <input
        type="checkbox"
        onClick={() => onToggle(todo.id)}
        checked={todo.done}
        readOnly={true}
      />
      <span
        style={{
          textDecoration: todo.done ? 'line-through' : 'none',
          marginRight: '.5rem',
          marginLeft: '.5rem',
        }}
      >
        {todo.text}
      </span>
      <button onClick={() => onRemove(todo.id)}>삭제</button>
    </div>
  );
};

const Todos = ({
  input,
  todos,
  onChangeInput,
  onInsert,
  onToggle,
  onRemove,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const id =
      todos
        .map((item) => item.id)
        .reduce((max, current) => Math.max(max, current), 0) + 1;

    onInsert(id, input);
    onChangeInput('');
  };

  const onChange = (e) => onChangeInput(e.target.value);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input value={input} onChange={onChange} />
        <button type="submit">등록</button>
      </form>
      <ul
        style={{
          listStyle: 'none',
        }}
      >
        {todos &&
          todos.map((item) => (
            <li key={item.id}>
              <TodoItem todo={item} onToggle={onToggle} onRemove={onRemove} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Todos;

/**
 * [리덕스]
 * 프리젠테이셔널 컴포넌트 : 주로 상태 관리가 이루어지지 않고 props 를 받아와 화면 UI를 보여주기만 하는 컴포넌트. src/components
 */
