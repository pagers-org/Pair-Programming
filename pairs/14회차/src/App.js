import Header from './components/header/Header.js';
import Main from './components/Main/Main.js';

export default class App {
  constructor(dom) {
    this.dom = dom;

    this.render();
    new Header(document.querySelector('header'));
    new Main(document.querySelector('main'));
  }

  render() {
    this.dom.innerHTML = `
      <header></header>
      <main></main>
    `;
  }
}
