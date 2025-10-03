import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

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
 */
