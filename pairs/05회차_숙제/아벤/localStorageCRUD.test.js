const LocalState = require('./localStorageCRUD.js');

const mockSetItem = jest.spyOn(window.localStorage.__proto__, 'setItem');
const mockGetItem = jest.spyOn(window.localStorage.__proto__, 'getItem');

// 사용자는 localStorage를 생성할 수 있다.
// 1. 설정없이 localState를 생성하면, 비어있는 값의 localStorage를 생성한다.
// 2. state만 설정하면, 비어있는 값의 localStorage를 생성한다.
// 3. item만 설정하면, localStorge 객체를 넘겨야 한다는 에러를 출력한다.
// 4. state와 item을 설정하고 localState를 생성하면, 설정된 item정보가 저장된 localStorage를 생성한다.
describe('사용자는 localStorage를 생성할 수 있다.', () => {
  test('1. 설정없이 localState를 생성하면, localStorage를 생성하지 않는다.', () => {
    const localState = new LocalState();
    expect(localState.state).toBeFalsy();
  });
  test('2. state만 설정하면, 비어있는 값의 localStorage를 생성한다.', () => {
    const localState = new LocalState(window.localStorage);
    expect(localState.state).toEqual(window.localStorage);
  });
  test('3. item만 설정하면, localStorge 객체를 넘겨야 한다는 에러를 출력한다.', () => {
    //
    const [key, value] = ['과일', ['바나나', '딸기']];
    const localState = new LocalState({ key, value });
    expect(() => {
      localState;
    }).toThrow();
  });
  test('4. state와 item을 설정하고 localState를 생성하면, 설정된 item 정보가 저장된 localStorage를 생성한다.', () => {
    const [key, value] = ['과일', ['바나나', '딸기']];
    new LocalState(window.localStorage, { key, value });
    expect(mockSetItem).toHaveBeenCalledWith(key, JSON.stringify(value));
  });
  test('5. item을 설정하고 createItem 호출하면, localStorage에 설정된 item 정보를 저장한다.', () => {
    const localState = new LocalState(window.localStorage);
    localState.createItem({ key: '개발자', value: ['백엔드', '프론트엔드'] });
    localState.readItem('개발자');
    expect(mockGetItem).toHaveBeenCalledWith('개발자');
  });
});

// 사용자는 localStorage에 값을 추가할 수 있다.
// 1. local storage에 이미 존재하는 key와 item을 설정하면, 해당 key에 item을 추가한다.
// 2. local storage에 존재하지 않는 key와 item을 설정하면, 설정한 key로 item이 저장된다.
// 3. key만 설정하면, 에러를 출력한다.
// 4. item만 설정하면, 에러를 출력한다.
describe('사용자는 localStorage에 값을 추가할 수 있다.', () => {
  const localState = new LocalState(window.localStorage);
  test('1. local storage에 이미 존재하는 key와 item을 설정하면, 해당 key에 item을 추가한다.', () => {
    localState.addItem('과일', '배');
    expect(localState.readItem('과일')).toEqual(['바나나', '딸기', '배']);
    localState.addItem('개발자', 'DevOps');
    expect(localState.readItem('개발자')).toEqual([
      '백엔드',
      '프론트엔드',
      'DevOps',
    ]);
  });
  test('2. local storage에 존재하지 않는 key와 item을 설정하면, 에러를 출력한다.', () => {
    // 🎇 협의가 필요한 부분, 에러출력? 허용? 🎇
    expect(() => {
      localState.addItem('교통', '기차');
    }).toThrow();
  });
  test('3. key만 설정하면, 에러를 출력한다.', () => {
    // 🎇 추가할 값이 없으니까 에러 보내는 게 좋을까? 🎇
    // addItem(key, value = '')
    // expect(() => { localState.addItem('과일') }).toThrow();
  });
  test('4. item만 설정하면, 에러를 출력한다.', () => {
    // 🎇 test case가 불필요하진 않은가? 🎇
    expect(() => {
      localState.addItem('', '수박');
    }).toThrow();
  });
});

// 사용자는 localStorage의 값을 불러올 수 있다.
// 1. key를 설정하면, 해당 key의 값을 불러온다.
// 2. 파라미터를 설정하지 않으면, 에러를 출력한다.
describe('사용자는 localStorage의 값을 불러올 수 있다.', () => {
  const localState = new LocalState(window.localStorage);
  test('1. key를 설정하면, 해당 key의 값을 불러온다.', () => {
    expect(localState.readItem('개발자')).toEqual([
      '백엔드',
      '프론트엔드',
      'DevOps',
    ]);
  });
  test('2. 파라미터를 설정하지 않으면, 에러를 출력한다.', () => {
    expect(() => {
      localState.readItem();
    }).toThrow();
  });
});

// 사용자는 localStorage의 값을 삭제할 수 있다.
// 1. key, target을 설정하면, 해당 key의 target 값을 삭제한다.
// 2. key만 설정하면, 삭제하지 않는다.
// 3. 설정한 target 값이 중복이면, 중복된 모든 target 값을 삭제한다.
describe('사용자는 localStorage의 값을 삭제할 수 있다.', () => {
  const localState = new LocalState(window.localStorage);
  test('1. key, target을 설정하면, 해당 key의 target 값을 삭제한다.', () => {
    localState.deleteItem('과일', '바나나');
    expect(localState.readItem('과일')).toEqual(['딸기', '배']);
    localState.deleteItem('개발자', '프론트엔드');
    expect(localState.readItem('개발자')).toEqual(['백엔드', 'DevOps']);
  });
  test('2. key만 설정하면, 삭제하지 않는다.', () => {
    localState.deleteItem('과일');
    expect(localState.readItem('과일')).toEqual(['딸기', '배']);
  });
  test('3. 설정한 target 값이 중복이면, 중복된 모든 target 값을 삭제한다.', () => {
    localState.addItem('과일', '귤');
    localState.addItem('과일', '귤');
    expect(localState.readItem('과일')).toEqual(['딸기', '배', '귤', '귤']);
    localState.deleteItem('과일', '귤');
    expect(localState.readItem('과일')).toEqual(['딸기', '배']);

    // TODO (오늘 / 내일) (식사 중복) {id: 1, content:'귤'}
    // TODO (오늘 / 내일) (식사 중복) {id: 2, content:'귤'}
  });
});

// 사용자는 localStorage의 값을 수정할 수 있다.
// 1. key, base, item을 설정하면, 해당 key의 base 값을 item 값으로 수정한다.
// 2. key에 설정한 base 값이 없으면, 값은 수정하지 않는다.
// 3. key에 설정한 base 값이 중복되면, 해당하는 모든 base 값을 item으로 수정한다.

describe('사용자는 localStorage의 값을 수정할 수 있다.', () => {
  const localState = new LocalState(window.localStorage);
  test('1. key, base, item을 설정하면, 해당 key의 base 값을 item 값으로 수정한다.', () => {
    localState.updateItem('과일', '딸기', '사과');
    expect(localState.readItem('과일')).toEqual(['사과', '배']);
    localState.updateItem('개발자', '백엔드', '안드로이드/iOS');
    expect(localState.readItem('개발자')).toEqual(['안드로이드/iOS', 'DevOps']);
  });
  test('2. key에 설정한 base 값이 없으면, 값은 수정하지 않는다.', () => {
    localState.updateItem('과일', '메론', '망고');
    expect(localState.readItem('과일')).toEqual(['사과', '배']);
  });
  test('3. key에 설정한 base 값이 중복되면, 해당하는 모든 base 값을 item으로 수정한다.', () => {
    localState.addItem('과일', '배');
    localState.updateItem('과일', '배', '참외');
    expect(localState.readItem('과일')).toEqual(['사과', '참외', '참외']);
  });
});
