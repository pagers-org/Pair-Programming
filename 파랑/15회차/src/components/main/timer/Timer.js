const Timer = ({ editable, timer = '05:00', progress = '50' }) => {
  return `
        <content>
            <section class="timer-wrap">
                <div class="timer" contenteditable="${editable}">${timer}</div>
                <div class="timer-buttons">
                    <button class="button">Swap</button>
                    <button class="button">Clear</button>
                    <button class="button">Play</button>
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
