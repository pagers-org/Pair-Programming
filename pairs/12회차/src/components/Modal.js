import { EMPTY } from '../util/constants/index.js';
import util from '../util/functions/index.js';

const { $ } = util.dom;
const { isEmpty } = util.valid;

const Modal = () => {
  let logs = [];

  const createUUID = () => {
    let dateTime = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, callback => {
      const randomNumber = (dateTime + Math.random() * 16) % 16 | 0;
      dateTime = Math.floor(dateTime / 16);
      return (callback == 'x' ? randomNumber : (randomNumber & 0x3) | 0x8).toString(16);
    });
  };

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
