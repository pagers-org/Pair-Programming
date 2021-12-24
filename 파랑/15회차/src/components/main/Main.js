import Timer from './timer/Timer.js';

export default class Main {
  constructor(dom, props) {
    this.dom = dom;
    this.props = props;

    this.render();
  }

  render(props = { editable: true }) {
    this.dom.innerHTML = `
      ${Timer(props)}
    `;
  }
}
