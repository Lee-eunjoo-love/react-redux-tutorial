import CounterContainer from './containers/CounterContainer';
import SampleContainer from './containers/SampleContainer';
import TodosContainer from './containers/TodosContainer';

function App() {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
      <hr />
      <SampleContainer />
    </div>
  );
}

export default App;
