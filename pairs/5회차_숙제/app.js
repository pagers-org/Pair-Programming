class LocalState {
  constructor(state, item) {
    this.state = state;
    item && this.createItem(item);
  }
  createItem(item) {
    this.setState(item);
  }

  readItem(key) {
    const item = this.state.getItem(key);
    // 추가
    if (!item) throw new Error('해당 아이템이 존재하지 않습니다.');
    return JSON.parse(item);
  }

  deleteItem(key, target) {
    const value = this.readItem(key).filter(item => item !== target);
    this.setState({ key, value });
  }

  updateItem(key, base, item) {
    const value = this.readItem(key).map(target =>
      target === base ? item : target,
    );
    this.setState({ key, value });
  }

  addItem(key, item) {
    const value = this.readItem(key);
    value.push(item);
    this.setState({ key, value });
  }

  setState({ key, value }) {
    this.state.setItem(key, JSON.stringify(value));
    console.log(key, value);
  }
}

class LocalStorageMock {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value;
  }

  removeItem(key) {
    delete this.store[key];
  }
}

module.exports = { LocalState, LocalStorageMock };
