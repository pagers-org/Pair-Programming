import Member from './Member.js';

export default class Modal {
  constructor(dom, props) {
    this.dom = dom;
    this.props = props;

    this.render();
  }

  render(props = { editable: true }) {
    this.dom.innerHTML = `
    <div>
      <a href="#" title="Close" class="modal-close">Close</a>
      <h1>멤버 관리</h1>
      ${Member(props)}
    </div>
    `;
  }
}
