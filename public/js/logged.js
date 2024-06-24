// Nav color function

const navBar = document.querySelector('.navbar');
const navTitle = document.querySelector('.nav-title');
const navLink = document.querySelectorAll('.nav-link');
const navbarToggler = document.querySelector('.navbar-toggler svg');

const navColorChange = () => {
  if (window.scrollY >= 120) {
    navBar.classList.add('nav-scroll');
    navTitle.classList.add('nav-title-scroll');
    navLink.forEach(element => element.classList.add('nav-link-scroll'));
    navbarToggler.removeAttribute("fill");
    navbarToggler.setAttribute("fill", "rgb(24, 24, 26)");
  } else {
    navBar.classList.remove('nav-scroll');
    navTitle.classList.remove('nav-title-scroll');
    navLink.forEach(element => element.classList.remove('nav-link-scroll'));
    navbarToggler.removeAttribute("fill");
    navbarToggler.setAttribute("fill", "rgb(255, 255, 255)");

  }
}

window.addEventListener("scroll", navColorChange);