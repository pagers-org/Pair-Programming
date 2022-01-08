import Timer from './timer/Timer.js';
import { $ } from '../../utils/functions.js';

export default class Main {
  constructor(dom) {
    this.dom = dom;

    this.render();
    this.bindEvent();
  }

  // Member는 무시해도 된다.
  render() {
    this.dom.innerHTML = `
    <content></content>
    <section class="management-wrap">
      <div class="buttons">
        <button class="offset">Management Member</button>
      </div>
    </section>
    `;

    new Timer($('content'));
  }

  bindEvent() {
    document.querySelector('.offset').addEventListener('click', () => {
      document.querySelector('.modal-window').classList.add('visible');
    });
  }
}
