# Frontend Mentor - Multi-step form solution

This is a solution to the [Multi-step form challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Frontend Mentor - Multi-step form solution](#frontend-mentor---multi-step-form-solution)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [The challenge](#the-challenge)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Author](#author)
  - [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Complete each step of the sequence
- Go back to a previous step to update their selections
- See a summary of their selections on the final step and confirm their order
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
- Receive form validation messages if:
  - A field has been missed
  - The email address is not formatted correctly
  - A step is submitted, but no selection has been made

### Screenshot

![desktop image of form](./assets/images/desktop-design-step-1.jpg.jpg)

### Links

- Solution URL: [Access the code here](https://github.com/Zeuhz-Droid/multi-step-form-main)
- Live Site URL: [Access the hosted site here](https://zeuhz-droid.github.io/multi-step-form-main/)

## My process

I took the desktop first process initiative, examined the site (both desktop and mobile), wrote the HTML, then CSS, before implementing the functionality with vanilla JS in functional programming.

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Desktop-first workflow

### What I learned

I revised my HTML syntaxes, semantics and arrangment.
I also brushed up on my media queries in CSS,
both most of all making and using pure functions in JS.

```js
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

  planReviewBtn = document.querySelector(".plan-review__btn");

  planReviewBtn.addEventListener("click", navTochangePlan);
}
```

You can check out this link to help with writing markdowns [The Markdown Guide](https://www.markdownguide.org/) to learn more.

### Continued development

- I will be transcribing (maybe overhaul) this code in the coming days to class oriented programming paradigm,
- I will also be sharpening my skills on algorithm and creating pure functions.

## Author

- Website - [Zeuhz](https://github.com/Zeuhz-Droid)
- Frontend Mentor - [@zeuhzDroid](https://www.frontendmentor.io/profile/Zeuhz-Droid)
- Twitter - [@yourusername](https://www.twitter.com/zeuhzDroid)

## Acknowledgments

Thank GOD, the king of glory.
