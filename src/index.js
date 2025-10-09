//import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import rootReducer, { rootSaga } from './modules';
import { Provider } from 'react-redux';
//import { devToolsEnhancer } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { thunk } from 'redux-thunk';
//import loggerMiddleware from './lib/loggerMiddleware';
import createSagaMiddleware from 'redux-saga';

// #. [리덕스 적용] 스토어 생성
const logger = createLogger();
// #. [redux-saga 적용] 사가 미들웨어 생성
const sagaMiddleware = createSagaMiddleware();
//const store = createStore(rootReducer, devToolsEnhancer(applyMiddleware(thunk, logger)));
const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk, sagaMiddleware),
);
// #. [redux-saga 적용] 사가 미들웨어 실행
sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
/*root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/**
 * UI 준비하기 :
 *  ㄴ [자주 사용되는 패턴] 프리젠테이셔널 컴포넌트와 컨테이너 컴포넌트 분리하기
 *     1. 프리젠테이셔널 컴포넌트 : 주소 상태 관리가 이루어지지 않고 props 를 받아와 화면 UI를 보여주기만 하는 컴포넌트. src/components
 *     2. 컨테이너 컴포넌트 : 리덕스와 연동되어 있는 컴포넌트로 리덕스로부터 상태를 받아 오기도하고 리덕스 스토어에 액션을 디스패치하기도 하는 컴포넌트. src/containers
 *
 * 리덕스 관련 구조
 *  1. 일반적 구조 : actions, constants, reducers 디렉토리에 각 기능별로 파일을 하나씩 생성
 *  2. Ducks 패턴 : 액션타입, 액션생성함수, 리듀서함수를 기능별로 파일 하나에 몰아서 작성. src/modules
 *
 * 리액트 애플리케이션에서 리덕스 적용하기
 *  1. 스토어 생성
 *  2. Provider 컴포넌트 사용하여 프로젝트에 리덕스 적용
 *
 * 리덕스 미들웨어 적용하기
 *
 * [redux-logger] yarn add redux-logger
 *
 * [redux-thunk] yarn add redux-thunk
 *   비동기 작업으 ㄹ처리할 때 가장 많이 사용하는 미들웨어. 객체가 아닌 함수 형태의 액션을 디스패치할 수 있게 해줌.
 *
 * [redux-saga] yarn add redux-saga
 *   리덕스 미들웨어 중 하나로, 비동기 작업을 처리하는데 사용.
 *   제너레이터 함수를 활용하여 비동기 흐름을 보다 쉽게 관리하고, 복잡한 비동기 로직을 간결하게 작성할 수 있게 해줌.
 *   제너레이터 함수는 함수 실행을 일시 중지했다가 필요할 때 다시 시작할 수 있는 특별한 함수.
 *   redux-saga는 이러한 제너레이터 함수를 사용하여 비동기 작업의 흐름을 제어하고, 액션의 디스패치와 상태 업데이트를 관리.
 *   (주요 개념)
 *    1. 사가(Saga) : 제너레이터 함수로 작성되며, 특정 액션이 디스패치될 때 실행되는 비동기 작업을 정의.
 *    2. 이펙트(Effect) : 사가 내부에서 사용하는 객체로, 특정 작업(예: 액션 디스패치, API 호출 등)을 설명.
 *    3. 미들웨어(Middleware) : 리덕스 스토어에 적용되어 액션이 디스패치될 때마다 사가를 실행.
 *   (주요 이펙트)
 *    1. takeEvery : 특정 액션이 디스패치될 때마다 사가를 실행. 모든 액션을 처리.
 *    2. takeLatest : 특정 액션이 디스패치될 때 가장 마지막으로 실행된 사가만 처리. 이전에 실행 중이던 사가는 취소.
 *    3. call : 비동기 함수를 호출할 때 사용. 프로미스를 반환하는 함수와 함께 사용.
 *    4. put : 액션을 디스패치할 때 사용.
 *    5. all : 여러 사가를 동시에 실행할 때 사용.
 *
 *  [webpack]
 *   웹팩에서 별도의 설정을 하지 않으면 프로젝트에서 사용중인 모든 자바스크립트 파일이 하나의 파일로 합쳐지고 모든 CSS 파일도 하나의 파일로 합쳐짐.
 *   build/static 디렉터리의 main 으로 시작하는 파일들: 컴포넌트 관련 코드가 들어 있는 빌드 파일
 *
 *  [코드 스플리팅]
 *   웹팩에서 제공하는 기능으로, 하나의 파일로 합쳐지는 자바스크립트 파일을 여러 개로 쪼개서 따로 관리할 수 있게 해줌.
 *
 *  [코드 비동기 로딩]
 *   자바스크립트 파일을 여러 개로 쪼갠 후, 특정 상황에서 필요한 파일만 비동기로 불러와서 사용할 수 있게 해줌.
 *   리액트 프로젝트에서 코드 비동기 로딩을 구현하는 가장 쉬운 방법은 React.lazy 와 Suspense 컴포넌트를 사용하는 것.
 */
