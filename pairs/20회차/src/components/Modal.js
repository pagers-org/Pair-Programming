import { $, $$ } from '../utils/functions.js';
import store from '../store/index.js';
import { isValidateName } from '../utils/validation.js';
import { EMPTY } from '../utils/constants.js';

export default class Modal {
  constructor(dom) {
    this.dom = dom;
    this.props = { ...store() };

    this.render();

    store({ type: 'subscribe', key: 'Modal', listener: this.render.bind(this) });
  }

  render(_, props) {
    const { driver, navigators } = props || this.props;
    this.dom.innerHTML = `
    <div class="open-modal-window">
      <a href="#" title="Close" class="modal-close">Close</a>
      <h1>Members</h1>
      <section class="input-wrap">
        <div class="driver-form">
          <form>
              <input id="driver-input" class="input" name="driver" type="text" placeholder="Input driver">
              <button class="submit driver-submit" disabled>➕</button>
          </form>
          <span id="driver-error" class="validate-error">옳지 못한 입력입니다.</span>
          <div class="driver-user">
          ${
            !driver.name
              ? ''
              : `
              <span class="user-name">${driver.name}</span>
              <button class="button button-user-delete" data-id=${driver.id}>❌</button>
              `
          }
          </div>
        </div>
        <div class="line"></div>
        <div class="navigator-form">
          <form>
              <input id="navigator-input" class="input" name="navigator" type="text" placeholder="Input navigator">
              <button class="submit navigator-submit" disabled>➕</button>
          </form>
          <span id="navigator-error" class="validate-error">옳지 못한 입력입니다.</span>
          <ul class="navigator-users">
            ${navigators
              .map(
                ({ id, name }) =>
                  `
                <li class="navigator-user">
                  <span class="user-name">${name}</span>
                  <button class="button button-user-delete"  data-id=${id}>❌</button>
                </li>
                `,
              )
              .join('')}
          </ul>
        </div>
      </section>
    </div>
    `;
    this.bindEvent();
  }

  bindEvent() {
    $('.modal-close').addEventListener('click', () => {
      $('.modal-window').classList.remove('visible');
      // 값이 변경되었다면 타이머 초기화
      store({ type: 'publish', key: 'Timer' });
    });

    $$('.input').forEach(item => {
      item.addEventListener('input', ({ target }) => {
        const $submitButton = $(`.${target.name}-submit`);
        const $errorMessage = $(`#${target.name}-error`);

        if (target.value === EMPTY) {
          $submitButton.setAttribute('disabled', '');
          $errorMessage.style.opacity = 0;
          return;
        }

        if (isValidateName(target.value, this.props)) {
          $submitButton.removeAttribute('disabled');
          $errorMessage.style.opacity = 0;
          return;
        }

        $submitButton.setAttribute('disabled', '');
        $errorMessage.style.opacity = 1;
      });
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
