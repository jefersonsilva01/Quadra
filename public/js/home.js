// Buttom scroll to top function

const buttonTop = document.getElementById('top-buttom');

const scrollToTop = () => window.scrollY >= 480
  ? buttonTop.style.opacity = 1
  : buttonTop.style.opacity = 0

window.addEventListener("scroll", scrollToTop);

// ================================================

// Overview show function

const overview = document.getElementById('overview');

const showOverview = () => {
  if (window.scrollY >= 480) {
    overview.style.opacity = 1;
    overview.style.paddingTop = '48px';
  }
}

window.addEventListener("scroll", showOverview);

// ================================================

// Gallery show function

const gallery = document.getElementById('gallery');

const showGallery = () => {
  if (window.scrollY >= 1550) {
    gallery.style.opacity = 1;
    gallery.style.paddingTop = '220px';
  }
}

window.addEventListener("scroll", showGallery);

// ================================================

// Subscribe show function

const specifications = document.getElementById('specifications');

const showSpecifications = () => {
  if (window.scrollY >= 2650) {
    specifications.style.opacity = 1;
    specifications.style.paddingTop = '53px';
  }
}

window.addEventListener("scroll", showSpecifications);

// ================================================

// Nav color function

const navBar = document.querySelector('.navbar')
const navTitle = document.querySelector('.nav-title')
const navLink = document.querySelectorAll('.nav-link')

const navColorChange = () => {
  if (window.scrollY >= 120) {
    navBar.classList.add('nav-scroll')
    navTitle.classList.add('nav-title-scroll')
    navLink.forEach(element => element.classList.add('nav-link-scroll'));
  } else {
    navBar.classList.remove('nav-scroll')
    navTitle.classList.remove('nav-title-scroll')
    navLink.forEach(element => element.classList.remove('nav-link-scroll'));
  }
}

window.addEventListener("scroll", navColorChange);

// ================================================


// Modal slider function

const btnLeft = document.querySelector(".btn-left");
const btnRight = document.querySelector(".btn-right");

const imagesSlide = [...document.querySelectorAll('.image-slider')]
const slideSize = imagesSlide.length;
let index;

const getElementActive = () => {
  imagesSlide.forEach(element => {
    if (element.classList.contains("active")) index = imagesSlide.indexOf(element);
  });
}

btnLeft.onclick = () => {
  getElementActive();

  if (index === 0) {
    imagesSlide[index].classList.toggle("active");
    imagesSlide[slideSize - 1].classList.toggle("active");

  } else {
    imagesSlide[index].classList.toggle("active");
    imagesSlide[index - 1].classList.toggle("active");
  }
}

btnRight.onclick = () => {
  getElementActive();

  if (index === slideSize - 1) {
    imagesSlide[index].classList.toggle("active");
    imagesSlide[0].classList.toggle("active");
  } else {
    imagesSlide[index].classList.toggle("active");
    imagesSlide[index + 1].classList.toggle("active");
  }
}

// ================================================

// Show gallery function 

const modalSlide = document.querySelector("#modal-slider");
const content = document.querySelector("#content");

const imageContainer = document.querySelectorAll(".image-container");

imageContainer.forEach(element => {
  element.onclick = () => {
    modalSlide.style.visibility = 'visible';
    content.style.height = '80%'
    content.style.opacity = 1;
  }
})

// Modal close function

const btnClose = document.querySelector("#btn-close");

btnClose.onclick = () => {
  modalSlide.style.visibility = 'hidden';
  content.style.height = '0%'
  content.style.opacity = 0;
}

// ================================================