const { LocalState, LocalStorageMock } = require('../../pairs/5회차/app.js');

/**
 * @see https://stackoverflow.com/questions/32911630/how-do-i-deal-with-localstorage-in-jest-tests/69929124#69929124
 */

let localState = null;
let localStorage = null;

const initItem = {
  key: 'items',
  value: ['Banana'],
};

describe('new LocalState', () => {
  beforeEach(() => {
    localStorage = new LocalStorageMock();
  });

  afterAll(() => {
    localStorage = null;
  });

  test('인스턴스 생성 시 2번째 파라미터는 초기 아이템 값이다.', () => {
    new LocalState(localStorage, initItem);
    const items = JSON.parse(localStorage.getItem('items'));
    expect(items).toStrictEqual(['Banana']);
  });

  test('인스턴스 생성 시 2번째 파라미터가 없다면 초기 아이템은 없다.', () => {
    new LocalState(localStorage);
    const items = JSON.parse(localStorage.getItem('items'));
    expect(items).toBe(null);
  });
});

describe('createItem', () => {
  beforeAll(() => {
    localStorage = new LocalStorageMock();
    localState = new LocalState(localStorage);
  });

  afterAll(() => {
    localState = null;
    localStorage = null;
  });

  test('새로운 키와 값으로 생성한다.', () => {
    localState.createItem(initItem);
    const items = JSON.parse(localStorage.getItem('items'));
    expect(items).toStrictEqual(['Banana']);
  });

  test('키가 같다면 값은 덮어씌워진다.', () => {
    const newItems = {
      key: 'items',
      value: ['Strawberry'],
    };
    localState.createItem(newItems);
    const items = JSON.parse(localStorage.getItem('items'));
    expect(items).toStrictEqual(['Strawberry']);
  });

  test('키가 다르면 새롭게 생성한다.', () => {
    const items = {
      key: 'items2',
      value: ['Banana'],
    };
    localState.createItem(items);
    const items2 = JSON.parse(localStorage.getItem('items2'));
    expect(items2).toStrictEqual(['Banana']);
  });
});

describe('readItem', () => {
  beforeAll(() => {
    localStorage = new LocalStorageMock();
    localState = new LocalState(localStorage, initItem);
  });

  test('존재하는 아이템의 키라면 값을 반환한다.', () => {
    expect(localState.readItem('items')).toStrictEqual(['Banana']);
  });

  test('키가 존재하지 않으면 에러를 출력한다.', () => {
    expect(() => localState.readItem('items2')).toThrow();
  });
});

describe('deleteItem', () => {
  test('삭제하려는 키에 원하는 아이템이 존재하면 삭제한다.', () => {
    localState.deleteItem('items', 'Banana');
    expect(localState.readItem('items')).toStrictEqual([]);
  });

  test('삭제하려는 키가 없다면 아무것도 실행하지 않는다.', () => {
    expect(() => localState.deleteItem('items2', 'Banana')).toThrow();
  });

  test('삭제하려는 키가 있으나 아이템이 없다면 수정되지 않는다.', () => {
    localState.deleteItem('items', 'Strawberry');
    expect(localState.readItem('items')).toStrictEqual([]);
  });
});

describe('updateItem', () => {
  beforeAll(() => {
    const item = {
      key: 'items3',
      value: ['BE'],
    };
    localState.createItem(item);
  });

  test('수정하려는 키에 수정하려는 아이템이 있다면 값을 변경한다.', () => {
    localState.updateItem('items3', 'BE', 'FE');
    expect(localState.readItem('items3')).toStrictEqual(['FE']);
  });
  test('수정하려는 키가 없다면 에러를 출력한다.', () => {
    expect(() => localState.updateItem('items4', 'FE', 'DevOps')).toThrow();
  });
  test('수정하려는 키가 있으나 아이템이 없다면 undefined를 반환한다.', () => {
    expect(
      localState.updateItem('items', 'Banana', 'Strawberry'),
    ).toStrictEqual(undefined);
  });
});

describe('addItem', () => {
  test('기 존재하는 아이템에 새로운 데이터를 추가한다.', () => {
    localState.addItem('items', 'Banana');
    expect(localState.readItem('items')).toStrictEqual(['Banana']);
  });

  test('아이템이 존재하지 않으면 에러를 출력한다.', () => {
    expect(() => localState.addItem('items5', 'PLEASE')).toThrow();
  });
});
