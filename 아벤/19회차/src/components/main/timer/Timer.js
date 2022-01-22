import {
  BUTTON_CLEAR,
  BUTTON_PLAY,
  BUTTON_SWAP,
  BUTTON_PAUSE,
  EMPTY,
  END_TIME,
  ONE_MINUTE,
  BUTTON_SAVE,
  BUTTON_SETUP,
  ONE_SECOND,
} from '../../../utils/constants.js';

import store from '../../../store/index.js';

export default class Timer {
  constructor(dom) {
    this.dom = dom;
    this.props = {};
    this.timer = {};
    const { driver, navigators } = store();
    this.driver = driver;
    this.navigator = navigators[0];

    this.initTimer();
    this.render();
    this.eventHandler();

    store({ type: 'subscribe', key: 'Timer', listener: this.render.bind(this) });
  }

  template(props, state) {
    this.props = props || {
      ...this.timer,
      editable: false,
      timerSet: !this.timer.timerId ? BUTTON_SETUP : BUTTON_CLEAR,
      on: !this.timer.timerId ? BUTTON_PLAY : BUTTON_PAUSE,
    };

    if (state) {
      const { driver, navigators } = state;
      this.driver = driver;
      this.navigator = navigators[0];
    }

    const { editable, time, progress, timerSet, on } = this.props;
    return `
        <content>
            <section class="timer-wrap">
                <div class="timer edit-timer-wrap" style="display:${editable ? '' : 'none'}">
                    <input type="text" id="edit-timer" value="${time}"/>
                </div>
                <div class="timer" style="display:${editable ? 'none' : ''}">${time}</div>
                <div class="timer-buttons">
                    <button class="button">${BUTTON_SWAP}</button>
                    <button id="setup" class="button">${timerSet}</button>
                    <button class="button">${on}</button>
                </div>
            </section>
            ${
              !this.driver.name || !this.navigator
                ? ''
                : `
              <section class="progressbar-wrap">
                <div class="roles">
                  <div class="driver" style="left:${progress}%;">
                      <span class="driver-name">${this.driver.name}</span>
                      <span class="driver-icon">🚗</span>
                  </div>
                  <div class="navigator">
                      <span class="navigator-name">${this.navigator.name}</span>
                      <span class="navigator-icon">😎</span>
                  </div>
                </div>
                <div class="progressbar"></div>
              </section>
              `
            }
        </content>
        `;
  }

  // Member는 무시해도 된다.
  render(props, state) {
    this.dom.innerHTML = this.template(props, state);
  }

  initTimer(timer) {
    this.timer = timer || {
      timerId: null,
      initTime: '05:00',
      time: '05:00',
      progress: '0',
    };

    return this.timer;
  }

  eventHandler() {
    this.dom.addEventListener('click', ({ target }) => {
      if (target.textContent === BUTTON_SAVE) {
        const { value } = document.querySelector('#edit-timer');
        this.render({
          ...this.initTimer({ ...this.timer, initTime: value, time: value }),
          editable: false,
          timerSet: BUTTON_SETUP,
          on: BUTTON_PLAY,
        });
      }
      if (target.textContent === BUTTON_SWAP) {
        const { driver, navigators } = store({
          type: 'swapRole',
          driver: this.driver,
          navigator: this.navigator,
        });
        this.driver = driver;
        this.navigator = navigators[0];
        this.render({
          ...this.initTimer(),
          editable: false,
          timerSet: BUTTON_SETUP,
          on: BUTTON_PLAY,
        });

        store({ type: 'publish', key: 'Modal' });
      }
      if (target.textContent === BUTTON_CLEAR || target.textContent === BUTTON_SETUP) {
        clearTimerId(this.timer.timerId);
        this.render({
          ...this.initTimer(),
          editable: true,
          timerSet: BUTTON_SAVE,
          on: BUTTON_PLAY,
        });
        document.querySelector('#setup').classList.toggle('save');
      }
      if (target.textContent === BUTTON_PLAY) {
        // 1. 1초 동안 적어지는 setInterval
        // 2. Play 버튼이 Pause로 변경
        this.startTimer();
      }
      if (target.textContent === BUTTON_PAUSE) {
        this.stopTimer();
      }
    });
  }

  /**
   * 1. Main 컴포넌트의 멤버 변수 Timer를 수정한다.
   * { editable, time = '00:05', progress = '0', on = BUTTON_PLAY }
   */
  startTimer() {
    this.timer.timerId = setInterval(() => {
      const timer = { ...this.timer }; // 현재 값
      if (END_TIME === timer.time) this.stopTimer();
      const [time, progress] = calculateTime(
        convertSeconds(timer.time, 1),
        convertSeconds(timer.initTime),
      );
      this.render({
        ...this.initTimer({ ...timer, time, progress }),
        timerSet: BUTTON_CLEAR,
        on: BUTTON_PAUSE,
      });
    }, ONE_SECOND);
  }

  stopTimer() {
    clearTimerId(this.timer.timerId);
    this.render({ ...this.timer, timerSet: BUTTON_CLEAR, on: BUTTON_PLAY });
  }
}

const convertSeconds = (time, second = 0) =>
  time
    .split(':')
    .reduce((seconds, digit, index) => seconds + Number(digit) * (index ? 1 : ONE_MINUTE), 0) -
  second;

const calculateTime = (seconds, initSeconds) => {
  const min = Math.floor(seconds / ONE_MINUTE);
  const time = `${min < 10 ? 0 : EMPTY}${min}:${seconds % ONE_MINUTE < 10 ? 0 : EMPTY}${
    seconds % ONE_MINUTE
  }`;
  // 프로그레스 : (현재 값 / 최초 값) * 100
  const progress = 100 - (seconds / initSeconds) * 100;
  return [time, progress];
};

const clearTimerId = timerId => (timerId !== null ? clearInterval(timerId) : null);
