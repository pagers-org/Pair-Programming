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
    });

    $('.submit').addEventListener('click', event => {
      event.preventDefault();
      const { value: name } = $('.input');
      state({ type: 'addMember', name });
      this.props = { ...this.props, member: state() };
      this.render();
    });
  }
}
