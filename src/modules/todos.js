// #. 액션 타입 정의 : '모듈명/액션명' 형태로 하여 액션명 충돌 방지
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

// #. 액션 생성 함수
export const changeInput = (input) => ({
  type: CHANGE_INPUT,
  input,
});

export const insert = (text) => ({
  type: INSERT,
  text,
});

export const toggle = (id) => ({
  type: TOGGLE,
  id,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});

// #. 초기 상태
const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초 배우기',
      done: true,
    },
    {
      id: 2,
      text: '리액트와 리덕스 사용하기',
      done: false,
    },
  ],
};

// #. 리듀서 함수
function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: state.todos.concat(action.todo),
      };
    case TOGGLE:
      return {
        ...state,
        todos: state.todos.map((item) =>
          item.id === action.id ? { ...item, done: !item.done } : item,
        ),
      };
    case REMOVE:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.id),
      };
    default:
      return state;
  }
}

export default todos;
