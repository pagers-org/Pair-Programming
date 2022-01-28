export default class Header {
  constructor(dom) {
    this.dom = dom;

    this.render();
  }

  render() {
    this.dom.innerHTML = `
      <h1 class="title">⏳ Pair-programming Timer</h1>
    `;
  }
}
