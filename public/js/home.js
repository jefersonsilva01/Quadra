const buttonTop = document.getElementById('top-buttom');

const scrollToTop = () => window.scrollY >= 480
  ? buttonTop.style.display = 'inline'
  : buttonTop.style.display = 'none'

window.addEventListener("scroll", scrollToTop);