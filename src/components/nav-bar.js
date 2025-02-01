const template = document.createElement("template");

template.innerHTML = `
  <style>
    nav {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-grow: 1;
      background: var(--surface1);
      padding: 16px;
    }
    #content {
      max-width: var(--max-content-width);
      width: 100%;
      flex-grow: 1;
      display: flex;
      align-items: center;
      gap: 16px;
    }
    #logo-icon {
      width: 48px;
    }
    h1 {
      margin: 0;
    }
  </style>
  <nav>
    <div id="content">
      <img id="logo-icon" src="/img/icon-off.svg"/>
      <h1>Hello World</h1>
    </div>
  </nav>
`;

customElements.define(
  "nav-bar",
  class extends HTMLElement {
    constructor() {
      super();

      const clone = template.content.cloneNode(true);

      this.attachShadow({ mode: "open" }).appendChild(clone);
    }

    static get observedAttributes() {
      return ["logo"];
    }

    attributeChangedCallback(_attribute, _oldValue, newValue) {
      const icon = this.shadowRoot.querySelector("#logo-icon");

      icon.setAttribute(
        "src",
        newValue === "on" ? "/img/brand/svg/icon.svg" : "/img/icon-off.svg",
      );
    }
  },
);
