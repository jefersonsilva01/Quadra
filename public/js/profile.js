const formProfile = document.getElementById("form-profile");

const btnUpdate = document.querySelector("#update");
const btnDelete = document.querySelector("#delete");
const modal = document.createElement('div')
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

  modal.style.visibility = 'visible'

  const content = document.getElementById("modal-content");
  content.style.height = 'auto';
  content.style.opacity = 1;

  const message = document.getElementById("content-message");
  message.innerText = `Are you sure ${text} your profile?`;

  const btnCancel = document.querySelector("#cancel");
  const btnClose = document.querySelector("#btn-close-subscription");

  btnClose.onclick = () => formProfile.removeChild(modal);

  btnCancel.onclick = () => formProfile.removeChild(modal);
}

btnUpdate.onclick = () => {
  const button = `<button id="confirm" type="submit">CONFIRM</button>`;

  createModal(button, 'update')
}

btnDelete.onclick = () => {
  const id = formProfile.action.split('/')[5];
  const button = `<a id="confirm" href="/private/profile/${id}/delete">CONFIRM</a>`;

  createModal(button, 'delete')
}

const inputs = [...document.getElementsByTagName('input')];

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


