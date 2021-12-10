import Calculator from './components/Calculator.js';

const $equal = document.querySelector('#operator-equal');
$equal.addEventListener('click', event => {
  // '1+2-6*3/4%5'
  console.log(Calculator('1+2'));
  console.log(Calculator('1-2'));
  console.log(Calculator('1*2'));
  console.log(Calculator('1/2'));
  console.log(Calculator('1%2'));
});
