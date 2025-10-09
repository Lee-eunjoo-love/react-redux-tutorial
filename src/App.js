import CounterContainer from './containers/CounterContainer';
//import SampleContainer from './containers/SampleContainer';
import TodosContainer from './containers/TodosContainer';
//import notify from './notify';
import './App.css';
import React, { Suspense, Component, useState } from 'react';
import loadable from '@loadable/component';

/*function App() {
  const onClick = () => {
    //notify();
    // #. [동적 import 문법] 특정 모듈을 비동기로 불러올 때 사용
    // - 함수형 컴포넌트에서 특정 함수(모듈)을 필요할 때 불러와서 사용하고 싶을 때 유용
    // - import() 함수는 프로미스를 반환
    // - import() 함수의 인수로 모듈 경로를 문자열로 넣어줌
    // - import() 함수는 자바스크립트 표준 문법이므로 바벨 등의 별도 설정 없이 사용 가능
    // - 주의 : import() 함수는 함수형 컴포넌트에서만 사용 가능. 클래스형 컴포넌트에서는 사용 불가.
    // - 웹팩에서 지원하고 있으므로 별도 설정없이 프로젝트에서 바로 사용 가능.
    // - import() 함수 형태로 메서드 내에서 사용하면 파일을 따로 분리시켜 저장하며 실제 함수가 필요한 시점에 파일을 불러와 함수를 사용하며 캐싱되므로 최초 한번만 로딩.
    import('./notify').then((result) => {
      result.default(); // notify() 실행 : 모듈에서 default 로 내보낸 함수는 module.default 로 참조.
    });
  };
  return (
    <div>
      <header className="App-header">
        <h1>자바스크립트 함수 비동기 로딩 예제</h1>
        <button onClick={onClick}>Hello React!</button>
      </header>
      <hr />
      <CounterContainer />
      <hr />
      <TodosContainer />
      <hr />
      <SampleContainer />
    </div>
  );
}*/

// #. React.lazy 와 Suspense 로 컴포넌트 코드 분리하기
// - React.lazy : 컴포넌트를 비동기로 불러올 때 사용
// - Suspense : 컴포넌트를 감싸서 비동기로 불러오는 동안 보여줄 대체 UI를 지정할 때 사용
// - React.lazy 와 Suspense 는 리액트 16.6 버전부터 지원
// - React.lazy 와 Suspense 는 함수형 컴포넌트에서만 사용 가능. 클래스형 컴포넌트에서는 사용 불가.
// - React.lazy 와 Suspense 는 자바스크립트 표준 문법이므로 바벨 등의 별도 설정 없이 사용 가능
// - 웹팩에서 지원하고 있으므로 별도 설정없이 프로젝트에서 바로 사용 가능.
/*class App extends Component {
  state = {
    SplitMe: null,
  };
  handleClick = async () => {
    const { SplitMe } = this.state;
    if (!SplitMe) {
      const loadedModule = await import('./SplitMe'); // import() 함수는 프로미스를 반환
      this.setState({
        SplitMe: loadedModule.default, // 모듈에서 default 로 내보낸 컴포넌트는 module.default 로 참조.
      });
    }
  };

  render() {
    const SampleContainer = React.lazy(() =>
      import('./containers/SampleContainer'),
    );
    return (
      <div>
        <header className="App-header">
          <h1>자바스크립트 함수 비동기 로딩 예제</h1>
          <button
            onClick={() => {
              //notify();
              import('./notify').then((result) => {
                result.default(); // notify() 실행 : 모듈에서 default 로 내보낸 함수는 module.default 로 참조.
              });
            }}
          >
            Hello React!
          </button>
          <p onClick={this.handleClick} style={{ cursor: 'pointer' }}>
            {this.state.SplitMe ? (
              <this.state.SplitMe />
            ) : (
              'SplitMe 컴포넌트 불러오기'
            )}
          </p>
        </header>
        <hr />
        <CounterContainer />
        <hr />
        <TodosContainer />
        <hr />
        <Suspense fallback={<div>로딩중...</div>}>
          <SampleContainer />
        </Suspense>
      </div>
    );
  }
}*/

// #. 함수형 컴포넌트에서 React.lazy 와 Suspense 로 컴포넌트 코드 분리하기 (클래스형 컴포넌트에서 사용 불가하며 SSR 에서도 사용 불가)
/*function App() {
  const [visible, setVisible] = useState(null);
  const onClick = async () => {
    setVisible(true);
  };

  // #. React.lazy : 컴포넌트를 렌더링하는 시점에 비동기 로딩하는 유틸 함수
  // #. Suspense : 컴포넌트를 감싸서 비동기로 불러오는 동안 보여줄 대체 UI를 지정하는 리액트 내장 컴포넌트.
  //               코드 스플리팅된 컴포넌트를 로딩을 시작하게 하고 로딩이 끝나지 않았을 때 보여줄 UI를 fallback props로 설정.
  const SplitMe = React.lazy(() => import('./SplitMe')); // import() 함수는 프로미스를 반환
  const SampleContainer = React.lazy(() =>
    import('./containers/SampleContainer'),
  );
  return (
    <div>
      <header className="App-header">
        <h1>자바스크립트 함수 비동기 로딩 예제</h1>
        <button onClick={onClick}>Hello React!</button>
        <Suspense fallback={<div>로딩중...</div>}>
          {visible && <SplitMe />}
        </Suspense>
      </header>
      <hr />
      <CounterContainer />
      <hr />
      <TodosContainer />
      <hr />
      <Suspense fallback={<div>로딩중...</div>}>
        <SampleContainer />
      </Suspense>
    </div>
  );
}*/

// #. @loadable/component 라이브러리 사용 (SSR 에서도 사용 가능)
// - @loadable/component : React.lazy 와 Suspense 의 단점을 보완한 라이브러리로 SSR 에서도 사용 가능.
// - yarn add @loadable/component
const SplitMe = loadable(() => import('./SplitMe'), {
  fallback: <div>로딩중...</div>,
});
const SampleContainer = loadable(() => import('./containers/SampleContainer'), {
  fallback: <div>로딩중...</div>,
});
function App() {
  const [visible, setVisible] = useState(null);
  const onClick = async () => {
    setVisible(true);
  };
  const onMouseOver = () => {
    // 마우스 오버시 미리 로딩
    SplitMe.preload();
  };
  return (
    <div>
      <div>
        <h1>자바스크립트 함수 비동기 로딩 예제</h1>
        <button onClick={onClick} onMouseOver={onMouseOver}>
          Hello React!
        </button>
        {visible && <SplitMe />}
      </div>
      <hr />
      <CounterContainer />
      <hr />
      <TodosContainer />
      <hr />
      <SampleContainer />
    </div>
  );
}

export default App;
