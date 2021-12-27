export default class Menu {
  constructor(dom) {
    this.dom = dom;

    this.render();
    this.bindEvent();
  }

  render() {
    this.dom.innerHTML = `
    <div class="pie pie1">
      <a href="#open-modal">
          <div class="pie-color pie-color1">
              <img class="setting" src="./assets/icons/setting-two-svgrepo-com.svg" width="100"
                  height="100"></img>
          </div>
      </a>
    </div>
    <div class="pie pie2">
        <div class="pie-color pie-color2">
            <img class="dark-mode" src="./assets/icons/dark-mode-svgrepo-com.svg" width="100" height="100"></img>
        </div>
    </div>
    <div class="pie pie3">
        <div class="pie-color pie-color3">
            <img class="reset-app" src="./assets/icons/effects-svgrepo-com.svg" width="100" height="100"></img>
        </div>
    </div>
    <div class="menu">
        <svg class="hamburger" xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
            <g fill="none" stroke="#000" stroke-width="7.999" stroke-linecap="round">
                <path d="M 55,26.000284 L 24.056276,25.999716" />
                <path d="M 24.056276,49.999716 L 75.943724,50.000284" />
                <path d="M 45,73.999716 L 75.943724,74.000284" />
                <path d="M 75.943724,26.000284 L 45,25.999716" />
                <path d="M 24.056276,73.999716 L 55,74.000284" />
            </g>
        </svg>
    </div>`;
  }

  bindEvent() {
    document.querySelector('.menu').addEventListener('click', () => {
      document.body.classList.toggle('active');
    });

    ['.pie1', '.pie2', '.pie3'].forEach(selector => {
      document.querySelector(selector).addEventListener('click', () => {
        document.body.classList.remove('active');
      });
    });
  }
}
