const PRIMITIVE_TYPES = Object.freeze([
  'number',
  'bigint',
  'string',
  'boolean',
  'symbol',
  'undefined',
]);
const OBJECT_TYPES = Object.freeze(['object', 'function']);

/**
 * 2021.11.24 부 개선 사항
 *
 * 1. constructor default value 설정
 * 2. item이라는 의미가 단일성이 강해 제거 createItem => create
 *
 */
class LocalState {
  constructor(state, item) {
    this.state = state;
    item && this.create(item);
  }

  /**
   * 로컬 스토리지에 아이템을 생성한다.
   *
   * @param {Object} item({key:'', value:''})
   */
  create(item) {
    this.setState(item);
  }

  /**
   * 로컬 스토리지에 접근하여 해당 key의 item에 값을 추가한다.
   * item은 어떤 원소든 상관 없다.
   *
   * @param {String} key
   * @param {*} item
   */
  add(key, item) {
    const value = this.readItem(key);
    value.push(item);
    this.setState({ key, value });
  }

  /**
   * 로컬 스토리지에 접근하여 해당 key로 저장된 아이템을 가져온다.
   *
   * @param {*} key
   * @returns
   */
  read(key) {
    if (!key) throw new Error('올바른 값을 입력해주세요.');
    const item = this.state.getItem(key);
    // 추가
    if (!item) throw new Error('해당 아이템이 존재하지 않습니다.');
    return JSON.parse(item);
  }

  /**
   * 로컬 스토리지에 접근하여 해당 key로 저장된 아이템 중 일부를 수정한다.
   *
   * @param {*} key
   * @param {*} base
   * @param {*} item
   */
  update(key, base, item) {
    const value = this.readItem(key).map(target =>
      target === base ? item : target,
    );
    this.setState({ key, value });
  }

  /**
   * 로컬 스토리지에 접근하여 해당 key로 저장된 아이템 중 일부를 삭제한다.
   *
   * @param {*} key
   * @param {*} target
   */
  remove(key, target) {
    const value = this.readItem(key).filter(item => item !== target);
    this.setState({ key, value });
  }

  /**
   * 로컬 스토리지에 key, item으로 데이터를 저장한다.
   *
   * @param {*} param0
   */
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
