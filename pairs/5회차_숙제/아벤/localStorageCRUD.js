// localstorage
module.exports = class LocalState {
  constructor(state, item) {
    this.state = state;
    item && this.createItem(item);
  }
  // create, read, delete, update
  // LocalState를 선언할 때 자동으로 한 번 실행
  createItem(item) {
    // 문자열, 숫자, Array, Object, Symbol, Date, RegExp...
    // LocalStorage [] x
    // createItem 단일 키이므로 값이 중복이 안 됩니다.
    // JSON.stringify(); "[]"
    this.setState(item);
  }

  readItem(key) {
    // items = key
    return JSON.parse(this.state.getItem(key));
  }

  deleteItem(key, target) {
    const value = this.readItem(key).filter(item => item !== target);
    this.setState({ key, value });
  }

  // 수정
  updateItem(key, base, item) {
    const value = this.readItem(key).map(target =>
      target === base ? item : target,
    );
    this.setState({ key, value });
  }

  // 추가
  addItem(key, item) {
    const value = this.readItem(key);
    value.push(item);
    this.setState({ key, value });
  }

  // local storage에 추가
  setState({ key, value }) {
    this.state.setItem(key, JSON.stringify(value));
    console.log(key, value);
  }
};

// const localState = new LocalState(window.localStorage);

// localState.createItem({ key: '과일', value: ['바나나', '딸기'] });
// localState.createItem({ key: '개발자', value: ['백엔드', '프론트엔드'] });

// localState.addItem('과일', '배');
// localState.addItem('개발자', 'DevOps');

// localState.deleteItem('과일', '바나나');
// localState.deleteItem('개발자', '프론트엔드');

// localState.updateItem('과일', '딸기', '사과');
// localState.updateItem('개발자', '백엔드', '안드로이드/iOS');
