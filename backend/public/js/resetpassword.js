const toggleResetForm = document.querySelector('.reset-open').addEventListener('click', (e) => {
    e.preventDefault();
    const form = document.querySelector('.tr-changepassword').classList.toggle('show');
});