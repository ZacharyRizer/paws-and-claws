window.addEventListener('DOMContentLoaded', event => {
    const navRight1 = document.querySelector('.nav-right-1');
    const navRight2 = document.querySelector('.nav-right-2');
    const greetMessage = document.querySelector('.greeting');
    const profileLink = document.getElementById('profile-link');
    const masthead = document.querySelector('masthead');
    const registerContainer = document.getElementById('registerContainer');
    const loggedInContainer = document.getElementById('loggedInContainer');
    const errorContainer = document.querySelector('error-container');

    if (localStorage.getItem("PAWS_AND_CLAWS_ACCESS_TOKEN")) {
        const name = localStorage.getItem("PAWS_AND_CLAWS_NAME");
        const role = localStorage.getItem("PAWS_AND_CLAWS_ROLE");
        greetMessage.innerHTML = `Welcome ${name}`;


        if (role === "Adopter") {
            profileLink.href = "/user-profile";
        } else if (role === "Shelter") {
            profileLink.href = "/shelter-profile";
        }

        navRight2.classList.remove('hidden');
        navRight1.classList.add('hidden');
        loggedInContainer.classList.remove('hidden');
        registerContainer.classList.add('hidden');
    } else {
        navRight2.classList.add('hidden');
        navRight1.classList.remove('hidden');
        loggedInContainer.classList.add('hidden');
        registerContainer.classList.remove('hidden');
    }
});