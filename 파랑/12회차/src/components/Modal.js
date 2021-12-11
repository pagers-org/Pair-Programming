import { EMPTY } from '../util/constants/index.js';
import { $, createUUID, isEmpty } from '../util/functions/index.js';

const Modal = () => {
  let logs = [];
  return (input, output, targetId = '') => {
    const setState = (inputData, outputData, targetId) => {
      logs = !isEmpty(targetId)
        ? logs.filter(log => log.id !== targetId)
        : [{ id: createUUID(), inputData, outputData }, ...logs];
      render();
    };

    const render = () => {
      const list = $('.modal-log');
      list.innerHTML = logs
        .map(({ id, inputData, outputData }) => {
          return `
          <li class="modal-log-list" key=${id}>
            <div class="modal-data-check">
              <span>선택</span>
            </div>
            <div class="modal-data-list">
              <p class="modal-log-input-list">${inputData}</p>
              <p class="modal-log-output-list">${outputData}</p>
            </div>
            <div class="modal-data-delete">
              <span>삭제</span>
            </div>
          </li>
      `;
        })
        .join(EMPTY);
    };

    setState(input, output, targetId);
  };
};

export default Modal();
