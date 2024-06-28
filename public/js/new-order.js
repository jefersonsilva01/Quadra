const carInfo = document.querySelector(".car-info");

const radioDark = document.getElementById("dark-chalks");
const radioWhite = document.getElementById("arctic-white");

const labelDark = document.querySelector("label[for='dark-chalks']");
const labelWhite = document.querySelector("label[for='arctic-white']");

const colorText = document.querySelector("#car-color span");

radioDark.addEventListener('click', () => {
  labelDark.classList.toggle('color-active');
  carInfo.classList.add('car-info-dark');
  colorText.innerText = "DARK CHALKS";

  if (labelWhite.classList.contains("color-active")) {
    carInfo.classList.toggle('car-info-white');
    labelWhite.classList.toggle('color-active');
  }
});

radioWhite.addEventListener('click', () => {
  labelWhite.classList.toggle('color-active');
  carInfo.classList.toggle('car-info-white');
  colorText.innerText = "ARCTIC WHITE";

  if (labelDark.classList.contains("color-active")) {
    carInfo.classList.toggle('car-info-dark');
    labelDark.classList.toggle('color-active');
  }
});

const container1 = document.getElementById("container-1");
const container2 = document.getElementById("container-2");

const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");

btnRight.onclick = () => {
  container1.style.display = "none";
  container2.style.display = "block";
}

btnLeft.onclick = () => {
  container2.style.display = "none";
  container1.style.display = "block";
}