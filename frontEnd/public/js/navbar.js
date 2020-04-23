window.addEventListener('DOMContentLoaded', event => {
    const navRight1 = document.querySelector('.nav-right-1');
    const navRight2 = document.querySelector('.nav-right-2');
    const greetMessage = document.querySelector('.greeting');

    if (localStorage.getItem("PAWS_AND_CLAWS_ACCESS_TOKEN")) {

        navRight2.classList.remove('hidden');
        navRight1.classList.add('hidden');
    } else {
        navRight2.classList.add('hidden');
        navRight1.classList.remove('hidden');
    }
});