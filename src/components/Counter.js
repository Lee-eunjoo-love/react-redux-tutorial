const Counter = ({ number, onIncrease, onDecrease }) => {
  return (
    <div>
      <h1>{number}</h1>
      <div>
        <button onClick={onIncrease}>+1</button>
        <button onClick={onDecrease}>-1</button>
      </div>
    </div>
  );
};

export default Counter;

/**
 * [리덕스]
 * 프리젠테이셔널 컴포넌트 : 주로 상태 관리가 이루어지지 않고 props 를 받아와 화면 UI를 보여주기만 하는 컴포넌트. src/components
 */
