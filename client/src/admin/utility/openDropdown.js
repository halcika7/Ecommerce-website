export const toggleDropdown = (e, classToggle) => {
  e.preventDefault();
  const parent = e.currentTarget.parentElement;
  parent.classList.toggle(classToggle);
};

export const toggleNav = (e, classToggle, secondClass) => {
  e.preventDefault();
  const nav = e.currentTarget.parentElement.parentElement;
  const nextDiv = e.currentTarget.nextSibling;
  nav.classList.toggle(classToggle);
  nextDiv.classList.toggle(secondClass);
};

export const removeWhiteBackground = classToggle => {
  const nav = document.querySelector("." + classToggle);
  nav.classList.remove(classToggle);
};

export const toggleSearchModal = (e, wrapper, classToggle, open) => {
  e.preventDefault();
  const searchModal = document.querySelector("." + classToggle);
  const wrapperModal = document.querySelector("." + wrapper);
  wrapperModal.classList.toggle(open);
  searchModal.classList.toggle(open);
};
