import { EMPTY } from '../util/constants/index.js';
import { $ } from '../util/functions/index.js';

// li 태그를 추가한다.
// const Modal = (input, output) => {
//   const list = $('.modal-log');
//   let logs = [];
//   let index = logs.length;

//   const deleteItem = id => {
//     logs = logs.filter(item => item.id !== id);
//     list.matches(`li #${id}`).removeChild();
//   };

//   const setState = (inputData, outputData) => {
//     index += 1;
//     const item = { id: index, input: inputData, output: outputData };
//     logs.push(item);
//     append(item);
//   };

//   const append = ({ input, output }) => {
//     const logList = `
//         <li class="modal-log-list" id="0">
//             <p class="modal-log-input-list">${input}</p>
//             <p class="modal-log-output-list">${output}</p>
//         </li>
//     `;
//     list.innerHTML = logList + list.innerHTML;
//   };

//   setState(input, output);
// };

// ESNext
// ES5 Before

const Modal = () => {
  let logs = [];
  return (input, output) => {
    const setState = (inputData, outputData) => {
      logs = [{ inputData, outputData }, ...logs];
      render();
    };

    const render = () => {
      const list = $('.modal-log');
      list.innerHTML = logs
        .map(({ inputData, outputData }) => {
          return `
          <li class="modal-log-list">
            <p class="modal-log-input-list">${inputData}</p>
            <p class="modal-log-output-list">${outputData}</p>
          </li>
      `;
        })
        .join(EMPTY);
    };

    setState(input, output);
  };
};
//`Prototype`
// export default Modal;
// class test {}

// // 프로토타입에서 생성된 인스턴스
// const t = new test();

// Modal 프로토타입
// const m = Modal(){return Number, string, boolean, undefined, null, Symbol;} 호출을 하는 형태니까 인스턴스
export default Modal();

/*
Modal(input, output);
...append(input, output) // 단건

저장된 데이터(복수)를 한 번에 불러오는 경우
for (){ ...append([inputs, outpus]); }
*/

// var PARANG_INC = (function () {
//   var TEST = [];
//   var state = {
//     test: function () {
//       console.log(TEST);
//     },
//     putComma: function (value) {
//       TEST.push(value);
//       return true;
//     },
//     // getter
//     getTest: function () {
//       return TEST;
//     },
//   };

//   return state;
// })();

// PARANG_INC.print('test');
