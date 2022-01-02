import Member from './Member.js';
import { $ } from '../../utils/functions.js';
import state from '../../store/index.js';

export default class Modal {
  constructor(dom, props) {
    this.dom = dom;
    this.props = { ...props, member: state() };

    this.render();
  }

  render() {
    this.dom.innerHTML = `
    <div class="open-modal-window">
      <a href="#" title="Close" class="modal-close">Close</a>
      <h1>Members</h1>
      ${Member(this.props)}
    </div>
    `;
    this.bindEvent();
  }

  bindEvent() {
    $('.modal-close').addEventListener('click', () => {
      $('.modal-window').classList.remove('visible');

      // 멤버의 값이 있으면 프로그레스바 표시
      if (true) {
        document.querySelector('.progressbar-wrap').style.display = '';
      }

      document.querySelector('.driver-name').textContent = '드라이버';
      document.querySelector('.navigator-name').textContent = '네비게이터';

      // 값이 변경되었다면 타이머 초기화
      if (true) {
        document.querySelector('.timer-wrap div:nth-child(2)').textContent = '04:00';
      }
    });

    $('.driver-submit').addEventListener('click', event => {
      event.preventDefault();
      const { value: name } = $('#driver-input');
      state({ type: 'addDriver', name });
      this.props = { ...this.props, member: state() };
      this.render();
    });

    $('.navigator-submit').addEventListener('click', event => {
      event.preventDefault();
      const { value: name } = $('#navigator-input');
      state({ type: 'addNavigator', name });
      this.props = { ...this.props, member: state() };
      this.render();
    });
  }
}
