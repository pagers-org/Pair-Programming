import { postRequest, renderForm } from './src/index.js';

// 최초 실행
let targetForm = renderForm('login');

const isCorrectEvent = (target, selector) => {
  return target.matches(selector);
};

document.querySelector('.container').addEventListener('click', async event => {
  const { target } = event;
  if (
    isCorrectEvent(target, '#loginButton') ||
    isCorrectEvent(target, '#signupButton')
  ) {
    event.preventDefault();
    const { value: userId } = document.getElementById(`${targetForm}-name`);
    const { value: password } = document.getElementById(`${targetForm}-pass`);
    const data = { userId, password };
    console.log(await postRequest({ url: targetForm, data }));
  }
  if (target.matches('p')) {
    targetForm = renderForm(target.dataset.component);
  }
});
