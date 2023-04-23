const container = document.querySelector(".container");
const form = document.querySelector(".form");

const stepNumbers = document.querySelectorAll(".step__number");
const formSteps = document.querySelector(".form-steps").children;

const btnNext = document.querySelector(".btn--next");
const btnConfirm = document.querySelector(".btn--confirm");
const btnBack = document.querySelector(".btn--back");

// FORM ELEMENTS
const userName = document.getElementById("name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone-number");

btnNext.addEventListener("click", nextStep);
btnBack.addEventListener("click", prevPage);
btnConfirm.addEventListener("click", submitForm);

function nextStep() {
  if (validateForm())
    for (let i = 0; i < formSteps.length; i++) {
      if (
        !formSteps[i].classList.contains("hide") &&
        i < formSteps.length - 1
      ) {
        if (i >= 0) btnBack.classList.remove("hide");
        formSteps[i].classList.add("hide");
        formSteps[i + 1].classList.remove("hide");
        if (i < stepNumbers.length) {
          stepNumbers[i].classList.remove("active");
          stepNumbers[i + 1].classList.add("active");
          if (++i == stepNumbers.length - 1) {
            btnNext.classList.add("hide");
            btnConfirm.classList.remove("hide");
          } else {
            btnNext.classList.remove("hide");
            btnConfirm.classList.add("hide");
          }

          break;
        }
      }
    }
}

function prevPage() {
  for (let i = 0; i < formSteps.length; i++) {
    if (!formSteps[i].classList.contains("hide") && i > 0) {
      btnConfirm.classList.add("hide");
      btnNext.classList.remove("hide");
      formSteps[i].classList.add("hide");
      formSteps[i - 1].classList.remove("hide");
      console.log(i);
      if (i < stepNumbers.length) {
        stepNumbers[i].classList.remove("active");
        stepNumbers[--i].classList.add("active");
        if (i < 1) btnBack.classList.add("hide");
        break;
      }
    }
  }
}

function submitForm() {}

function renderFormError(elem, msg) {
  const span = document.createElement("span");
  span.classList.add("form__error-msg");
  span.textContent = msg;
  elem.insertAdjacentElement("beforeend", span);
  elem
    .closest(".form__group")
    .querySelector(".form__input")
    .classList.add("error");
}

function removeError(elem) {
  if (elem.closest(".form__group").querySelector(".form__error-msg")) {
    elem.closest(".form__group").querySelector(".form__error-msg").remove();
    elem
      .closest(".form__group")
      .querySelector(".form__input")
      .classList.remove("error");
  }
}

function checkChar(string) {
  const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  if (format.test(string)) {
    return true;
  } else {
    return false;
  }
}

function createFormElem(elem) {
  return elem.closest(".form__group").querySelector(".form__label");
}

function verify(elem) {
  removeError(elem);
  if (createFormElem(elem).children.length < 2) {
    if (!elem.value) {
      renderFormError(createFormElem(elem), `This field is required`);
    }

    if (elem == userName) {
      if (elem.value && checkChar(elem.value))
        renderFormError(createFormElem(elem), `No special characters.`);
    }

    if (elem == email) {
      if (elem.value && !elem.value.includes("@" || "."))
        renderFormError(createFormElem(elem), `Invalid Email`);
    }
  }

  if (createFormElem(elem).children.length == 1) return true;
}

function validateForm() {
  if (verify(userName) && verify(email) && verify(phoneNumber)) {
    return true;
  }
}
