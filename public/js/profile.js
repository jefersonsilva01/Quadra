const formProfile = document.getElementById("form-profile"),
  id = formProfile.action.split('/')[5],
  btnUpdate = document.querySelector("#update"),
  btnDelete = document.querySelector("#delete"),
  modal = document.createElement('div'),
  inputs = [...document.getElementsByTagName('input')];

let button;

modal.setAttribute("id", "modal");

const createModal = (button, text) => {
  modal.innerHTML = `
    <div id="modal-content">
      <div id="icon">
        <svg
          id="btn-close-subscription"
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="rgb(24, 24, 26)"
          class="bi bi-x-circle-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
          />
        </svg>
      </div>
      <p id="content-message"></p>

      <div id="modal-buttons">
        <a id="cancel">CANCEL</a>
        ${button}
      </div>
    </div>
    `;

  formProfile.appendChild(modal);


  const content = document.getElementById("modal-content");
  const message = document.getElementById("content-message");
  message.innerText = `Are you sure ${text} your profile?`;

  modal.style.visibility = 'visible'
  content.style.height = 'auto';
  content.style.opacity = 1;

  const btnCancel = document.querySelector("#cancel");
  const btnClose = document.querySelector("#btn-close-subscription");

  btnClose.onclick = () => formProfile.removeChild(modal);
  btnCancel.onclick = () => formProfile.removeChild(modal);
}

btnUpdate.onclick = () => {
  button = `<button id="confirm" type="submit">CONFIRM</button>`;

  createModal(button, 'update')
}

btnDelete.onclick = () => {
  button = `<a id="confirm" href="/private/profile/${id}/delete">CONFIRM</a>`;

  createModal(button, 'delete')
}

inputs.forEach(input => {
  const currentValue = input.value;

  input.addEventListener('input', () => {
    if (currentValue !== input.value) {
      btnUpdate.removeAttribute("disabled")
    } else {
      btnUpdate.setAttribute("disabled", "true")
    }
  });
});


