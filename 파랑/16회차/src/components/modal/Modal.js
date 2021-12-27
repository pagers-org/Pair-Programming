import Member from './Member.js';

export default class Modal {
  constructor(dom, props) {
    this.dom = dom;
    this.props = props;

    this.render();
    this.bindEvent();
  }

  render(props = { editable: true }) {
    this.dom.innerHTML = `
    <div class="open-modal-window">
      <a href="#" title="Close" class="modal-close">Close</a>
      <h1>멤버 관리</h1>
      ${Member(props)}
    </div>
    `;
  }

  bindEvent() {
    document.querySelector('.modal-close').addEventListener('click', () => {
      document.querySelector('.modal-window').classList.remove('visible');
    });
  }
}
