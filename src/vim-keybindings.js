const main = document.querySelector("main");

const keybinds = [
  [['ArrowDown'], () => {
    main.scrollBy(0, window.innerHeight / 2);
  }],
  [['j'], () => {
    main.scrollBy(0, window.innerHeight / 2);
  }],
  [['ArrowUp'], () => {
    main.scrollBy(0, -window.innerHeight / 2);
  }],
  [['k'], () => {
    main.scrollBy(0, -window.innerHeight / 2);
  }],
  [['g', 'g'], () => {
    main.scrollBy(0, -main.scrollHeight);
  }],
]

/* Some window-scoped functions for vim-like keybindings */
window.addEventListener("keydown", (event) => {

});

window.leftRightKeys = function () {};
window.contentScrollEvent = function () {};

window.addEventListener("keydown", window.leftRightKeys);
