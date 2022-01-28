/**
 * @see: https://github.com/mdn/web-components-examples/blob/master/life-cycle-callbacks/main.js
 */
export default class View extends HTMLElement {
  static get observedAttributes() {
    return ['c', 'l'];
  }

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const div = document.createElement('div');
    const style = document.createElement('style');
    shadow.appendChild(style);
    shadow.appendChild(div);
  }

  connectedCallback() {
    console.log('Custom View element added to page.');
  }

  disconnectedCallback() {
    console.log('Custom View element removed from page.');
  }

  adoptedCallback() {
    console.log('Custom View element moved to new page.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('Custom View element attributes changed.');
  }
}
