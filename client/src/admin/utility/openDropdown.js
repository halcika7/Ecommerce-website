export const toggleDropdown = (e, classToggle) => {
	e.preventDefault();
	const parent = e.currentTarget.parentElement;
	parent.classList.toggle(classToggle);
};

export const removeWhiteBackground = classToggle => {
	const nav = document.querySelector('.' + classToggle);
	nav.classList.remove(classToggle);
};
