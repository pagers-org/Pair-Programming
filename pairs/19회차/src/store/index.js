import { getId } from '../utils/functions.js';

// update 함수를 통했을 당시 값은 전달할 수 있지만, 그 전의 값은 가져오지 못한다.
const closure = () => {
  // 데이터를 저장할 변수
  const memory = {
    driver: { id: '0', name: '파랑' },
    navigators: [{ id: '0', name: '아벤' }],
  };

  const subscribers = {};

  // 구조분해할당을 통해 변경된 state를 갱신한다.
  const addDriver = (state, { name }) => {
    state.driver = { ...state.driver, name, id: getId() };
    return state;
  };

  const addNavigator = (state, { name }) => {
    state.navigators.push({ name, id: getId() });
    return state;
  };

  const deleteDriver = state => {
    state.driver = {};
    return state;
  };

  const deleteNavigator = (state, { id }) => {
    state.navigators = state.navigators.filter(navigator => navigator.id !== id);
    return state;
  };

  const swapRole = (state, { driver, navigator }) => {
    state.driver = navigator;
    state.navigators = [...state.navigators.slice(1), driver];
    return state;
  };

  return action => {
    // 내부 state가 freeze 되어 값 변경이 불가능해짐. 확인 방법은 Object.isFrozen(memory);
    // if (!action) return Object.freeze(memory);
    if (!action) return Object.freeze({ ...memory });
    switch (action.type) {
      case 'subscribe': {
        subscribers[action.key] = action.listener;
        break;
      }
      case 'publish': {
        subscribers[action.key](null, Object.freeze({ ...memory }));
        break;
      }
      case 'addDriver': {
        console.log(`type: ${action.type}\nmember: ${addDriver(memory, action)}`);
        break;
      }
      case 'addNavigator': {
        console.log(`type: ${action.type}\nmember: ${addNavigator(memory, action)}`);
        break;
      }
      case 'deleteDriver': {
        console.log(`type: ${action.type}`, deleteDriver(memory));
        break;
      }
      case 'deleteNavigator': {
        console.log(`type: ${action.type}`, deleteNavigator(memory, action));
        break;
      }
      case 'swapRole': {
        const state = swapRole(memory, action);
        console.log(memory);
        console.log(`type: ${action.type}`, state);
        return state;
      }
    }
  };
};

export default closure();
