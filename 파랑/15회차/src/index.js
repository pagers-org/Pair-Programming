import App from './App.js';

const app = new App(document.querySelector('#root'));

['.pie1', '.pie2', '.pie3'].forEach(selector => {
  document.querySelector(selector).addEventListener('click', () => {
    document.body.classList.remove('active');
  });
});
