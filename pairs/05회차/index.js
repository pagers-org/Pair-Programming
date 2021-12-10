import { login, renderForm } from './src/index.js';

const $loading = document.querySelector('.loading');

// 로딩 이미지 표시/숨기기
const loading = () => {
  // 있으면 없애고
  // 없으면 추가하고
  $loading.classList.toggle('hidden');
};

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

    loading();
    console.log(await login(data, targetForm));
    loading();
  }
  if (target.matches('p')) {
    targetForm = renderForm(target.dataset.component);
  }
});
