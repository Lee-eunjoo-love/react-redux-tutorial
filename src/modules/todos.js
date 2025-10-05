import { createAction, handleActions } from 'redux-actions';
// #. 액션 타입 정의 : '모듈명/액션명' 형태로 하여 액션명 충돌 방지
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

// #. 액션 생성 함수
/*export const changeInput = (input) => ({
  type: CHANGE_INPUT,
  input,
});

export const insert = (id, text) => ({
  type: INSERT,
  todo: { id, text, done: false },
});

export const toggle = (id) => ({
  type: TOGGLE,
  id,
});

export const remove = (id) => ({
  type: REMOVE,
  id,
});*/
// #. 액션 생성 함수 redux-actions 로 더 간편하게 생성
export const changeInput = createAction(CHANGE_INPUT, (input) => input);
export const insert = createAction(INSERT, (todo) => todo);
export const toggle = createAction(TOGGLE, (id) => id);
export const remove = createAction(REMOVE, (id) => id);

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
/*function todos(state = initialState, action) {
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
}*/
// #. 리듀서 함수 redux-actions 로 더 간편하게 생성 : handleActions(<각 액션 업데이트 함수>, 초기 상태)
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, action) => ({ ...state, input: action.payload }),
    [INSERT]: (state, action) => ({
      ...state,
      todos: state.todos.concat({
        id:
          state.todos
            .map((item) => item.id)
            .reduce((max, current) => Math.max(max, current), 0) + 1,
        text: action.payload,
        done: false,
      }),
    }),
    [TOGGLE]: (state, action) => ({
      ...state,
      todos: state.todos.map((item) =>
        item.id === action.payload ? { ...item, done: !item.done } : item,
      ),
    }),
    [REMOVE]: (state, action) => ({
      ...state,
      todos: state.todos.filter((item) => item.id !== action.payload),
    }),
  },
  initialState,
);

export default todos;
