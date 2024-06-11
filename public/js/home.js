// Buttom scroll to top function

const buttonTop = document.getElementById('top-buttom');

const scrollToTop = () => window.scrollY >= 480
  ? buttonTop.style.display = 'inline'
  : buttonTop.style.display = 'none'

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