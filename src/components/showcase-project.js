import styles from "./showcase-project.css?inline";

const template = document.createElement("template");
template.innerHTML = `
<style>${styles}</style>
<div id="content">
  <div id="header"></div>

  <div id="slides" hidden>
    <slot></slot>
  </div>

  <div id="cover">
    <div id="cover-image"></div>
  </div>

  <div _flex="col" gap="16">
    <div id="description"></div>
    <div id="pagination">
      <button class="pag-btn" id="prev-btn">&lt;</button>
      <div id="pag-buttons" _flex="grow"></div>
      <button class="pag-btn" id="next-btn">&gt;</button>
    </div>
  </div>
</div> 
`;

window.customElements.define(
  "showcase-project",
  class extends HTMLElement {
    constructor() {
      super();

      this.slides = [];
      this.currentSlide = 0;

      const shadow = this.attachShadow({ mode: "open" });
      shadow.appendChild(template.content.cloneNode(true));

      const self = this;
      const title = self.getAttribute("title");
      const url = self.getAttribute("url");
      const source = self.getAttribute("source");
      const slot = shadow.querySelector("slot");

      // Populate the title, url, and source
      if (url) {
        const titleLink = document.createElement("a");
        titleLink.id = "title";
        titleLink.textContent = `${title} ↗`;
        titleLink.href = url;
        titleLink.target = "_blank";
        shadow.querySelector("#header").appendChild(titleLink);
      } else {
        const titleHeader = document.createElement("h2");
        titleHeader.id = "title";
        titleHeader.textContent = title;
        shadow.querySelector("#header").appendChild(titleHeader);
      }

      if (source) {
        const sourceLink = document.createElement("a");
        sourceLink.textContent = "[Source Code ↗]";
        sourceLink.href = source;
        sourceLink.target = "_blank";
        sourceLink.id = "source";
        shadow.querySelector("#header").appendChild(sourceLink);
      }

      // Wait for the slot to be populated, then populate the slides
      slot.addEventListener("slotchange", () => {
        const slides = slot
          .assignedNodes({ flatten: false })
          .filter((node) => node.nodeType === Node.ELEMENT_NODE);

        // Add pagination buttons and attacn event listeners
        for (let i = 0; i < slides.length; i++) {
          const pagButton = document.createElement("button");
          pagButton.classList.add("pag-btn");
          pagButton.textContent = i + 1;
          pagButton.addEventListener("click", () => {
            self.currentSlide = i;
            self.updateSlide();
          });

          shadow.querySelector("#pag-buttons").appendChild(pagButton);
        }

        // Store and update slides
        self.slides = slides.map((slide) => ({
          image: slide.getAttribute("src"),
          description: slide.innerHTML,
        }));
        self.updateSlide();
      });
    }

    // Attach event listeners on initialization
    connectedCallback() {
      const shadow = this.shadowRoot;
      const vimScrollContainer = document.querySelector("vim-scroll-container");

      // If onscrollsnapchange is supported, use it over scrollend
      if ("onscrollsnapchange" in window) {
        vimScrollContainer.removeEventListener("scrollsnapchange", window.contentScrollEvent, { passive: true });
        this.attachLeftRightHandlers();
        vimScrollContainer.addEventListener("scrollsnapchange", window.contentScrollEvent, { passive: true });
      } else {
        vimScrollContainer.removeEventListener("scrollend", window.contentScrollEvent, { passive: true });
        this.attachLeftRightHandlers();
        vimScrollContainer.addEventListener("scrollend", window.contentScrollEvent, { passive: true });
      }

      // Attach event listeners to the next/prev pagination buttons
      shadow
        .querySelector("#next-btn")
        .addEventListener("click", this.nextSlide.bind(this));
      shadow
        .querySelector("#prev-btn")
        .addEventListener("click", this.prevSlide.bind(this));

      // Drag to zoom on the cover image
      const coverImage = shadow.querySelector("#cover-image");
      const cover = shadow.querySelector("#cover");
      let isDragging = false;

      const startDragging = () => {
        isDragging = true;
        coverImage.classList.add("dragged");
      };

      const stopDragging = () => {
        isDragging = false;
        coverImage.classList.remove("dragged");
      };

      coverImage.addEventListener("mousedown", startDragging);
      coverImage.addEventListener("mouseup", stopDragging);
      coverImage.addEventListener("touchstart", (e) => {
        startDragging();
        e.preventDefault();
      });
      coverImage.addEventListener("touchend", stopDragging);
      coverImage.addEventListener("mousemove", (e) => {
        if (isDragging) {
          coverImage.style.transformOrigin = `${e.offsetX}px ${e.offsetY}px`;
          cover.style.backgroundPosition = `${e.offsetX / 4}px ${e.offsetY / 4}px`;
        }
      });
      coverImage.addEventListener("touchmove", (e) => {
        if (isDragging) {
          const touch = e.touches[0];
          coverImage.style.transformOrigin = `${touch.clientX}px ${touch.clientY}px`;
          cover.style.backgroundPosition = `${touch.clientX / 4}px ${touch.clientY / 4}px`;
        }
      });
    }

    // Attach H/L key handlers to navigate between slides
    attachLeftRightHandlers() {
      window.contentScrollEvent = function () {
        const projects = Array.from(
          document.querySelectorAll("showcase-project"),
        );
        const projectsColliding = projects.filter(collidesWithViewport);
        const largestProjectColliding = projectsColliding.sort(
          (a, b) => getIntersectingArea(b) - getIntersectingArea(a),
        )[0];

        window.removeEventListener("keydown", window.leftRightKeys);
        window.leftRightKeys = function (event) {
          if (event.key === "ArrowLeft" || event.key === "h") {
            largestProjectColliding.prevSlide();
          } else if (event.key === "ArrowRight" || event.key === "l") {
            largestProjectColliding.nextSlide();
          }
        };
        window.addEventListener("keydown", window.leftRightKeys);
      };
    }

    // Go to the next slide
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
      this.updateSlide();
    }

    // Go to the previous slide
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length;
      this.updateSlide();
    }

    // Update the image, description, and active pagination button
    updateSlide() {
      const currentSlide = this.slides[this.currentSlide];
      this.shadowRoot.querySelector("#cover-image").style.backgroundImage =
        `url(${currentSlide.image})`;
      this.shadowRoot.querySelector("#description").innerHTML =
        currentSlide.description;

      const pagButtons = this.shadowRoot.querySelectorAll(
        "#pag-buttons > .pag-btn",
      );
      pagButtons.forEach((pagButton, i) => {
        pagButton.classList.toggle("focused", i === this.currentSlide);
      });
    }
  },
);

// Get the intersecting area of an element and the viewport
function getIntersectingArea(element) {
  const rect = element.getBoundingClientRect();

  const intersectWidth = Math.max(
    0,
    Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0),
  );

  const intersectHeight = Math.max(
    0,
    Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
  );

  return intersectWidth * intersectHeight;
}

// Check if an element collides with the viewport
function collidesWithViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top < window.innerHeight &&
    rect.bottom > 0 &&
    rect.left < window.innerWidth &&
    rect.right > 0
  );
}
