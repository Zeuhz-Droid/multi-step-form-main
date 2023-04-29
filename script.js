const container = document.querySelector(".container");
const form = document.querySelector(".form");

const stepNumbers = document.querySelectorAll(".step__number");
const formSteps = document.querySelector(".form-steps").children;

const btnNext = document.querySelector(".btn--next");
const btnConfirm = document.querySelector(".btn--confirm");
const btnBack = document.querySelector(".btn--back");

const planToggle = document.querySelector(".plan__toggle");

const addOns = document.querySelectorAll(".add-ons");

// FORM ELEMENTS
const userName = document.getElementById("name");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phone-number");

const review = document.querySelector(".review");
// const addOnsReview = document.querySelector(".add-ons-review");

const finishUp = document.querySelector(".finish-up");

const user = {
  plan: {},
  add_ons: [],
};

// EVENT LISTENERS
btnNext.addEventListener("click", nextStep);
btnBack.addEventListener("click", prevStep);
btnConfirm.addEventListener("click", confirmInfo);

let verifiedStep = 0;

function nextStep() {
  if (verifiedStep == 0) if (!validateForm()) return;
  for (let i = 0; i < formSteps.length; i++) {
    if (!formSteps[i].classList.contains("hide") && i < formSteps.length - 1) {
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

  verifiedStep++;

  // show year or month add-ons plan depending on user pick
  showAddonType();

  // save form info
  storeFormInfo();

  // check and save plan info
  CheckedPlan();

  // select and save add-ons
  addOns.forEach((el) => pickAddons(el));

  // render user informations
  renderUserInfo();
}

function prevStep() {
  for (let i = 0; i < formSteps.length; i++) {
    if (!formSteps[i].classList.contains("hide") && i > 0) {
      btnConfirm.classList.add("hide");
      btnNext.classList.remove("hide");
      formSteps[i].classList.add("hide");
      formSteps[i - 1].classList.remove("hide");
      if (i < stepNumbers.length) {
        stepNumbers[i].classList.remove("active");
        stepNumbers[--i].classList.add("active");
        if (i < 1) btnBack.classList.add("hide");
        break;
      }
    }
  }
  verifiedStep--;
}

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

function removeFormError(elem) {
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

function submitForm() {}

function verify(elem) {
  removeFormError(elem);
  if (createFormElem(elem).children.length < 2) {
    if (!elem.value) {
      renderFormError(createFormElem(elem), `This field is required`);
    }

    if (elem == userName) {
      if (elem.value && checkChar(elem.value))
        renderFormError(createFormElem(elem), `No special characters.`);
    }

    if (elem == email) {
      if (elem.value && !elem.value.includes("@"))
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

function showMonthlyPlan() {
  document
    .querySelectorAll("[name=plan-type-yearly]")
    .forEach((el) => el.removeAttribute("checked"));
  document.querySelector(".plan-time__title.monthly").classList.add("active");
  document.querySelector(".plan-time__title.yearly").classList.remove("active");
  document.querySelector(".plans__monthly").classList.remove("hide");
  document.querySelector(".plans__yearly").classList.add("hide");
}

function showYearlyPlan() {
  document.querySelector(".plan-time__title.yearly").classList.add("active");
  document
    .querySelector(".plan-time__title.monthly")
    .classList.remove("active");
  document.querySelector(".plans__yearly").classList.remove("hide");
  document.querySelector(".plans__monthly").classList.add("hide");
  document
    .querySelector(".plans__yearly")
    .querySelector(".plan-type__input--arcade")
    .setAttribute("checked", "");
}

function planTimeToggle() {
  planToggle.addEventListener("click", (e) => {
    if (e.target.value == "monthly") {
      showMonthlyPlan();
    }
    if (e.target.value == "yearly") {
      showYearlyPlan();
    }
  });
}
planTimeToggle();

function showAddonType() {
  if (verifiedStep != 2) return;

  const planTime = document.querySelectorAll(".plan-time__input");

  planTime.forEach((el) => {
    if (el.checked) {
      document
        .querySelectorAll(".add-ons")
        .forEach((el) => el.classList.add("hide"));
      document.querySelector(`.add-ons.${el.value}`).classList.remove("hide");
    }
  });
}

function storeFormInfo() {
  user.name = userName.value;
  user.email = email.value;
  user.tel_No = phoneNumber.value;
}

function storePlanInfo(elem) {
  if (verifiedStep != 2) return;
  if (elem.checked) {
    const plan = elem.closest(".plan-container").querySelector(".plan");

    user.plan.duration = elem.title;

    user.plan.description =
      plan.querySelector(".plan__description").textContent;

    user.plan.amount = Number(plan.querySelector(".plan__amount").textContent);
  }
}

function CheckedPlan() {
  const planAll = document.querySelectorAll(".plan-type__input");

  planAll.forEach((el) => {
    if (el.checked) {
      storePlanInfo(el);
    }
  });
}

function pickAddons(elem) {
  if (verifiedStep != 3) return;
  if (elem.classList.contains("hide")) return;
  user.add_ons.length = 0;

  elem.querySelectorAll(".add-on__input").forEach((el) => {
    if (el.checked) {
      const add_on = el.closest(".add-on");
      const addOnObj = {};

      addOnObj.title = add_on.querySelector(".add-on__title").textContent;
      addOnObj.description =
        add_on.querySelector(".add-on__subtitle").textContent;
      addOnObj.amount = add_on.querySelector(".add-on__amount").textContent;
      addOnObj.duration = add_on
        .querySelector(".add-on__input")
        .title.split("-")[2];

      user.add_ons.push(addOnObj);
    }
  });
}

function renderUserInfo() {
  if (review) review.innerHTML = "";
  if (document.querySelector(".total-plan"))
    document.querySelector(".total-plan").remove();

  const planReviewHtml = `<div class="plan-review">
  <div class="plan-review__title">
    <span class="plan-review__name">${user.plan.description}(${
    user.plan.duration
  })</span>
    <button type="button" class="btn plan-review__btn">
      Change
    </button>
  </div>
  <div class="plan-review__price">
    $<span class="plan-review__value">${user.plan.amount}</span>/${
    user.plan.duration == "monthly" ? "mo" : "yr"
  }
  </div>
</div>`;

  function createAddOnHtml(parent, el) {
    const addOnsReviewHtml = `
      <div class="add-on-review">
        <span class="add-on-review__title">${el.title}</span>
        <span class="add-on-review__price">+$<span>${el.amount}</span>/${
      el.duration == "monthly" ? "mo" : "yr"
    }</span>
      </div>`;

    parent.insertAdjacentHTML("beforeend", addOnsReviewHtml);
  }

  const totalHtml = `
  <div class="total-plan">
    <div class="total-plan__type">${
      user.plan.duration == "monthly" ? "Total (per month)" : "Total (per year)"
    }</div>
    <div class="total-plan__price">
      +$<span class="total-plan__value">${calcTotal(user)}</span>/${
    user.plan.duration == "monthly" ? "mo" : "yr"
  }
    </div>
  </div>
  `;

  if (verifiedStep != 3) return;
  const addOnsReview = document.createElement("div");
  addOnsReview.classList.add("add-ons-review");
  review.insertAdjacentElement("beforeend", addOnsReview);

  review.insertAdjacentHTML("afterbegin", planReviewHtml);

  user.add_ons.forEach((el) => {
    createAddOnHtml(addOnsReview, el);
  });

  finishUp.insertAdjacentHTML("beforeend", totalHtml);
}

function calcTotal(user) {
  let addOnsAmount = 0;

  user.add_ons.forEach((el) => (addOnsAmount += +el.amount));

  return +user.plan.amount + +addOnsAmount;
}

function confirmInfo() {
  for (let i = 0; i < formSteps.length; i++) {
    formSteps[i].classList.add("hide");
  }

  document.querySelector(".btn-container").classList.add("hide");
  document.querySelector(".thank-you").classList.remove("hide");
  document;
}
