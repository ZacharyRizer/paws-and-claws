import { handleErrors, api } from "./utils.js";
import { petCardBuilder } from "./petCardHelperFunctions.js";

const masthead = document.querySelector(".masthead");

window.addEventListener('DOMContentLoaded', async (e) => {
    masthead.classList.remove('hidden');

    try {
        const res = await fetch(`${api}pets`);

        if (res.status === 401) {
            window.location.href = "/log-in";
            return; //redirect to the log-in page
        }
        const { pets } = await res.json();

        const petsContainer = document.querySelector(".card-container");
        const petsHtml = petCardBuilder(pets);
        petsContainer.innerHTML = petsHtml

    } catch (err) {
        handleErrors(err);
    }

    const petCards = document.querySelectorAll('.card');

    petCards.forEach(petCard => petCard.addEventListener('click', async (e) => {
        let clickTarget = e.target.parentNode;

        while (!clickTarget.id) {
            clickTarget = clickTarget.parentNode;
        }

        const petNum = parseInt(clickTarget.id.split('-')[1], 10);

        window.location.href = `/pets/${petNum}`;
    }));
});
