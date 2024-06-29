// Function change car color

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

// =======================================================================

// function change form

const container1 = document.getElementById("container-1");
const container2 = document.getElementById("container-2");

const btnLeft = document.querySelector(".left");
const btnRight = document.querySelector(".right");

btnLeft.style.backgroundColor = "var(--main-white)";

btnRight.onclick = () => {
  btnLeft.style.backgroundColor = "var(--main-white-two-percent)";
  btnRight.style.backgroundColor = "var(--main-white)";
  container1.style.display = "none";
  container2.style.display = "block";
}

btnLeft.onclick = () => {
  btnRight.style.backgroundColor = "var(--main-white-two-percent)";
  btnLeft.style.backgroundColor = "var(--main-white)";
  container2.style.display = "none";
  container1.style.display = "block";
}

//==========================================================================

// Function get address

const addressCode = document.getElementById("address-code");

addressCode.addEventListener("input", () => {
  if (addressCode.value.length === 5) addressCode.value += '-';

  if (addressCode.value.length === 9) {
    const code = addressCode.value.split('-').join('');

    axios({
      method: 'GET',
      url: `https://viacep.com.br/ws/${code}/json/`,
    }).
      then(response => {
        const city = document.getElementById("city");
        const state = document.getElementById("state")
        const street = document.getElementById("street");

        city.value = response.data.localidade;
        state.value = response.data.uf;
        street.value = response.data.logradouro;
      })
      .catch(err => console.log(err));
  }
});

// ===================================================================

// Functions format date and card number

const expirateDate = document.getElementById("expirate-date");

expirateDate.addEventListener("input", () => {
  if (expirateDate.value.length === 2) expirateDate.value += "/";
})

const cardNumber = document.getElementById("card-number");

cardNumber.addEventListener("input", () => {
  const count = [4, 9, 14];
  if (count.includes(cardNumber.value.length)) {
    cardNumber.value += " ";
  }
});

// ===================================================================

// Function validate form

const inputs = [...document.getElementsByTagName('input')];

const btnOrderNow = document.getElementById("order-now");

inputs.forEach(input => {
  input.addEventListener("input", () => {
    const color = document.querySelector("input[name='color']:checked").value;
    const addressCode = document.getElementById("address-code").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value
    const street = document.getElementById("street").value;
    const number = document.getElementById("number").value;
    const cardName = document.getElementById("card-name").value;
    const cardNumber = document.getElementById("card-number").value;
    const expirateDate = document.getElementById("expirate-date").value;
    const cvc = document.getElementById("cvc").value;

    if (color !== ""
      && addressCode.length === 9
      && city !== ""
      && state.length === 2
      && street !== ""
      && number !== ""
      && cardName !== ""
      && cardNumber.length === 19
      && expirateDate.length === 5
      && cvc.length === 3) {
      btnOrderNow.removeAttribute("disabled");
    } else {
      btnOrderNow.setAttribute("disabled", "true");
    }
  });
});

// ===================================================================