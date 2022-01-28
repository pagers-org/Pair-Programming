import Header from './components/Header.js';
import Menu from './components/Menu.js';
import Main from './components/Main.js';
import Modal from './components/Modal.js';

export default class App {
  constructor(dom) {
    this.dom = dom;

    this.render();
    new Menu(document.querySelector('aside'));
    new Header(document.querySelector('header'));
    new Main(document.querySelector('main'));
    new Modal(document.querySelector('#open-modal'));
  }

  render() {
    this.dom.innerHTML = `
      <header></header>
      <main></main>
    `;
  }
}
