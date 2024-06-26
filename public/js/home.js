// Buttom scroll to top function

const buttonTop = document.getElementById('top-buttom'),

  scrollToTop = () => window.scrollY >= 480
    ? buttonTop.style.opacity = 1
    : buttonTop.style.opacity = 0

window.addEventListener("scroll", scrollToTop);

// ================================================

// Overview show function

const overview = document.getElementById('overview'),

  showOverview = () => {
    if (window.scrollY >= 480) {
      overview.style.opacity = 1;
      overview.style.paddingTop = '48px';
    }
  }

window.addEventListener("scroll", showOverview);

// ================================================

// Gallery show function

const gallery = document.getElementById('gallery'),

  showGallery = () => {
    if (window.scrollY >= 1550) {
      gallery.style.opacity = 1;
      gallery.style.paddingTop = '220px';
    }
  }

window.addEventListener("scroll", showGallery);

// ================================================

// Subscribe show function

const specifications = document.getElementById('specifications'),

  showSpecifications = () => {
    if (window.scrollY >= 2650) {
      specifications.style.opacity = 1;
      specifications.style.paddingTop = '53px';
    }
  }

window.addEventListener("scroll", showSpecifications);

// ================================================

// Nav color function

const navBar = document.querySelector('.navbar'),
  navTitle = document.querySelector('.nav-title'),
  navLink = document.querySelectorAll('.nav-link'),
  navbarToggler = document.querySelector('.navbar-toggler svg'),

  navColorChange = () => {
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

// ================================================


// Modal slider function

const btnLeft = document.querySelector(".btn-left"),
  btnRight = document.querySelector(".btn-right"),

  imagesSlide = [...document.querySelectorAll('.image-slider')],
  slideSize = imagesSlide.length;

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

const modalSlide = document.querySelector("#modal-slider"),
  content = document.querySelector("#content"),
  imageContainer = document.querySelectorAll(".image-container");

imageContainer.forEach(element => {
  element.onclick = () => {
    modalSlide.style.visibility = 'visible';
    content.style.height = '90%'
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

const modalSubscription = document.querySelector("#modal-subscribe"),
  contentSubscription = document.querySelector("#modal-content"),
  btnCloseSubscription = document.querySelector("#btn-close-subscription");

btnCloseSubscription.onclick = () => {
  modalSubscription.style.visibility = 'hidden';
  contentSubscription.style.height = '0%'
  contentSubscription.style.opacity = 0;
}

// ================================================