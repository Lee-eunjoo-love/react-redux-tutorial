import { useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

/*const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

// #. connect 함수를 사용해 리덕스와 연계된 컴포넌트 반환 (mapStateToProps: state 전달, mapDispatchToProps: store 내장함수 전달)
// #. mapStateToProps: (state) => {...} 또는 ({state 비구조화 할당}) => {...}
// #. mapDispatchToProps: 객체 형태로 전달하면 connect 함수가 내부적으로 bindActionCreators 유틸함수로 액션 생성 함수를 dispatch 로 감싸는 작업을 내부적으로 수행
export default connect(
  (state) => ({
    number: state.counter.number,
  }),
  { increase, decrease },
)(CounterContainer);*/

// #. connect 함수 대신 useSelector Hook을 사용하여 리덕스의 상태 조회 및 useDispatch Hook 사용하여 스토어 내장함수 dispatch 사용
// #. useCallback 으로 액션 디스패치 함수 감싸 리랜더링시마다 함수 새로 생성하지 않도록 하여 컴포넌트 최적화
const CounterContainer = () => {
  const number = useSelector((state) => state.counter.number);
  const dispatch = useDispatch();
  const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
  const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);
  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;

/**
 * #. 컨테이너 컴포넌트 : 리덕스와 연동되어 있는 컴포넌트로 리덕스로부터 상태를 받아오고 스토어에 액션을 디스패치한다.
 */
