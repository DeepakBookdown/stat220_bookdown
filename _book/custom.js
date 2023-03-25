document.addEventListener("DOMContentLoaded", function () {
  const onPageNavbar = document.querySelector(".book .book-body .onthispage-nav");
  if (onPageNavbar) {
    onPageNavbar.parentNode.removeChild(onPageNavbar);
  }
});

