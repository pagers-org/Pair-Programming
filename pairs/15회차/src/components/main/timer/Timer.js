import { BUTTON_SWAP } from '../../../utils/constants.js';

const Timer = ({ editable, time, progress, timerSet, on }) => {
  return `
        <content>
            <section class="timer-wrap">
                <div class="timer" style="display:${editable ? '' : 'none'}">
                    <input type="text" id="edit-timer" value="${time}"/>
                </div>
                <div class="timer" style="display:${editable ? 'none' : ''}">${time}</div>
                <div class="timer-buttons">
                    <button class="button">${BUTTON_SWAP}</button>
                    <button id="setup" class="button">${timerSet}</button>
                    <button class="button">${on}</button>
                </div>
            </section>
            <section class="progressbar-wrap">
                <div class="roles">
                    <div class="driver" style="left:${progress}%;">
                        <span class="driver-name">파랑</span>
                        <span class="driver-icon">🚗</span>
                    </div>
                    <div class="navigator">
                        <span class="navigator-name">아벤</span>
                        <span class="navigator-icon">😎</span>
                    </div>
                </div>
                <div class="progressbar"></div>
            </section>
        </content>
        `;
};

export default Timer;
