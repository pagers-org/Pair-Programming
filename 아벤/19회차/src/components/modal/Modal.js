import Member from './Member.js';
import { $ } from '../../utils/functions.js';
import store from '../../store/index.js';

export default class Modal {
  constructor(dom) {
    this.dom = dom;
    this.props = { ...store() };

    this.render();

    store({ type: 'subscribe', key: 'Modal', listener: this.render.bind(this) });
  }

  render(_, props) {
    this.dom.innerHTML = `
    <div class="open-modal-window">
      <a href="#" title="Close" class="modal-close">Close</a>
      <h1>Members</h1>
      ${Member(props || this.props)}
    </div>
    `;
    this.bindEvent();
  }

  bindEvent() {
    $('.modal-close').addEventListener('click', async () => {
      $('.modal-window').classList.remove('visible');
      // 값이 변경되었다면 타이머 초기화
      store({ type: 'publish', key: 'Timer' });
    });

    $('.driver-submit').addEventListener('click', event => {
      event.preventDefault();
      const { value: name } = $('#driver-input');
      store({ type: 'addDriver', name });
      this.props = { ...store() };
      this.render();
    });

    $('.navigator-submit').addEventListener('click', event => {
      event.preventDefault();
      const { value: name } = $('#navigator-input');
      store({ type: 'addNavigator', name });
      this.props = { ...store() };
      this.render();
    });

    const deleteDriver = ({ target }) => {
      if (!target.matches('.button-user-delete')) return;
      store({ type: 'deleteDriver' });
      this.props = { ...store() };
      this.render();
    };

    const deleteNavigator = ({ target }) => {
      if (!target.matches('.button-user-delete')) return;
      store({ type: 'deleteNavigator', id: target.dataset.id });
      this.props = { ...store() };
      this.render();
    };

    $('.driver-user').addEventListener('click', deleteDriver);
    $('.navigator-users').addEventListener('click', deleteNavigator);
  }
}
