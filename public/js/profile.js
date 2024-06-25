const formProfile = document.getElementById("form-profile");

const btnUpdate = document.querySelector("#update");
const btnDelete = document.querySelector("#delete");

let btnCancel, btnClose, modalDelete, modalUpdate, message, content;


btnUpdate.onclick = () => {
  const updateContent = document.createElement('div');
  updateContent.setAttribute("id", "modal-update");
  updateContent.innerHTML = `
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
        <button id="confirm" type="submit">CONFIRM</button>
      </div>
    </div>
    `;

  formProfile.appendChild(updateContent);

  modalUpdate = document.getElementById("modal-update");
  modalUpdate.style.visibility = 'visible'

  content = document.getElementById("modal-content");
  content.style.height = 'auto';
  content.style.opacity = 1;

  message = document.getElementById("content-message");
  message.innerText = "Are you sure update your profile?";

  btnCancel = document.querySelector("#cancel");
  btnClose = document.querySelector("#btn-close-subscription");

  btnClose.onclick = () => formProfile.removeChild(updateContent);

  btnCancel.onclick = () => formProfile.removeChild(updateContent);
}

btnDelete.onclick = () => {
  const id = formProfile.action.split('/')[5];

  const deleteContent = document.createElement('div');
  deleteContent.setAttribute("id", "modal-delete");
  deleteContent.innerHTML = `
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
        <a id="confirm" href="/private/profile/${id}/delete">CONFIRM</a>
      </div>
    </div>
  `;

  formProfile.appendChild(deleteContent);

  modalDelete = document.getElementById("modal-delete");
  modalDelete.style.visibility = 'visible'

  content = document.getElementById("modal-content");
  content.style.height = 'auto';
  content.style.opacity = 1;

  message = document.getElementById("content-message");
  message.innerText = "Are you sure delete your profile?";

  btnClose = document.querySelector("#btn-close-subscription");
  btnCancel = document.querySelector("#cancel");

  btnClose.onclick = () => formProfile.removeChild(deleteContent);

  btnCancel.onclick = () => formProfile.removeChild(deleteContent);
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


