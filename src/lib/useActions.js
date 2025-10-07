import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

export default function useActions(actions, deps) {
  const dispatch = useDispatch();

  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((action) => bindActionCreators(action, dispatch));
      }

      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : [dispatch],
  );
}

/**
 * useActiosns: https://react-redux.js.org/api/hooks#recipe-useactions
 *   액션 생성함수를 액션을 디스패치하는 함수로 변환. (액션 생성 함수를 사용하여 액션 객체를 만들고 이 액션 객체를 스토어에 디스패치하는 작업을 해 주는 함수로 변환)
 *   원래 react-redux 에 내장된 상태로 릴리즈될 계획이었으나 리덕스 개발팀에서 꼭 필요하지 않다고 판단하여 제외된 Hook으로 공식 문서에서 복사하여 사용 가능하도록 코드 제공.
 *   1. 첫번째 파라미터: 액션 생성 함수로 이루어진 배열.
 *   2. 두번째 파라미터: deps 배열이며 이 배열 안에 들어 있는 원소가 바뀌면 액션을 디스패치하는 함수를 새로 생성.
 *
 * #. connect vs (useSelector 와 useDispatch)
 *   1. connect 함수를 사용하여 컨테이너 컴포넌트를 만들 경우,
 *      해당 컨테이너 컴포넌트의 부모 컴포넌트가 리랜더링될 때 해당 컴포넌트의 props 가 바뀌지 않은 경우 리렌더링 자동 방지되어 성능 최적화
 *   2. useSelector 와 useDispatch 함수를 사용하여 컨테이너 컴포넌트를 만들 경우,
 *      useSelector 를 사용해 리덕스 상태를 조회할 때는 connect 와 같은 성능 최적화 작업이 자동으로 이루어지지 않으므로
 *      성능 최적화를 위해 React.memo 를 컨테이너 컴포넌트에 사용해 주어야 한다.
 */
