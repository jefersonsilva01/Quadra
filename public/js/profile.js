const btnUpdate = document.querySelector("button[type='submit']");
const inputs = [...document.getElementsByTagName('input')];

console.log(btnUpdate)

inputs.forEach(input => {
  const currentValue = input.value;
  input.addEventListener('input', () => {
    console.log(currentValue, input.value);

    if (currentValue !== input.value) {
      btnUpdate.removeAttribute("disabled")
    } else {
      btnUpdate.setAttribute("disabled", "true")
    }
  });
});
