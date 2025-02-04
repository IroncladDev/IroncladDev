/**
 * Custom Element for navigating between pages similar to Next.js's Link component
 *
 * Usage:
 * <a href="/about.html" is="nav-link">About</a>
 */
window.customElements.define(
  "nav-link",
  class extends HTMLAnchorElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.addEventListener("click", (e) => {
        e.preventDefault();

        let url = this.getAttribute("href");

        fetch(url)
          .then((response) => response.text())
          .then((html) => {
            this.replaceHTML(html);
            window.history.pushState(null, "", url);
          })
          .catch(() => {
            window.location.href = url;
          });
      });

      window.addEventListener("popstate", () => {
        fetch(window.location.pathname)
          .then((response) => response.text())
          .then(this.replaceHTML)
          .catch(() => {
            window.location.reload();
          });
      });
    }

    // Replace the current body with the new HTML
    // Also replaces the custom <style> in the <head>
    replaceHTML(html) {
      const parser = new DOMParser().parseFromString(html, "text/html");

      const styles = parser.querySelectorAll("style");
      styles.forEach((style) => {
        const currentPageStyle = document.querySelector("style");
        if (currentPageStyle) currentPageStyle.remove();

        document.head.appendChild(style.cloneNode(true));
      });

      document.body.innerHTML = parser.querySelector("body").innerHTML;
    }
  },
  { extends: "a" },
);
