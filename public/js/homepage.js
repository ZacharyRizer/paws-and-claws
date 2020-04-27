import { handleErrors, api } from "./utils.js";
import { petCardBuilder, handlePetCardClick } from "./petCardHelperFunctions.js";

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

    handlePetCardClick();
});
