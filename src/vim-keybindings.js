/* Some window-scoped functions for vim-like keybindings */
window.addEventListener("keydown", (event) => {
  const main = document.querySelector("main");

  // Scoll down/up by one pixel, mandatory scroll snapping takes care of the rest
  if (event.key === "j" || event.key === "ArrowDown") {
    main.scrollBy(0, window.innerHeight / 2);
  } else if (event.key === "k" || event.key === "ArrowUp") {
    main.scrollBy(0, -window.innerHeight / 2);
  }
});

window.leftRightKeys = function () {};
window.contentScrollEvent = function () {};

window.addEventListener("keydown", window.leftRightKeys);
