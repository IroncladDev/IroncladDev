import styles from './vim-scroll-container.css?inline';

const template = document.createElement('template');

template.innerHTML = `
<style>${styles}</style>
<main id="content">
  <slot></slot>
</main>
<div id="indicator">
  <img src="/img/vim.svg" alt="Vim Icon" width="16" height="16" />
  <div>
    <button id="h-button">H</button>
    <button id="j-button">J</button>
    <button id="k-button">K</button>
    <button id="l-button">L</button>
  </div>
</div>
`


window.customElements.define(
  'vim-scroll-container',
  class extends HTMLElement {
    constructor() {
      super();

      const shadow = this.attachShadow({ mode: 'open' });
      shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      const shadow = this.shadowRoot;
      const content = shadow.querySelector("#content");

      // Attach event listeners to the H/L buttons
      shadow.querySelector("#j-button").addEventListener("click", () => content.scrollBy(0, 1));
      shadow.querySelector("#k-button").addEventListener("click", () => content.scrollBy(0, -1));

      window.addEventListener("keydown", (event) => {
        if (event.key === "h" || event.key === "ArrowLeft") {
          shadow.querySelector("#h-button").classList.add("focused");
        } else if (event.key === "l" || event.key === "ArrowRight") {
          shadow.querySelector("#l-button").classList.add("focused");
        } else if (event.key === "j" || event.key === "ArrowDown") {
          shadow.querySelector("#j-button").classList.add("focused");
        } else if (event.key === "k" || event.key === "ArrowUp") {
          shadow.querySelector("#k-button").classList.add("focused");
        }
      });

      window.addEventListener("keyup", (event) => {
        if (event.key === "h" || event.key === "ArrowLeft") {
          shadow.querySelector("#h-button").classList.remove("focused");
        } else if (event.key === "l" || event.key === "ArrowRight") {
          shadow.querySelector("#l-button").classList.remove("focused");
        } else if (event.key === "j" || event.key === "ArrowDown") {
          shadow.querySelector("#j-button").classList.remove("focused");
        } else if (event.key === "k" || event.key === "ArrowUp") {
          shadow.querySelector("#k-button").classList.remove("focused");
        }
      });
    }
  }
)
