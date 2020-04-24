import { handleErrors, convertAge, convertSex, convertSize } from "./utils.js";

const masthead = document.querySelector(".masthead");
const registerContainer = document.getElementById("registerContainer");
const loggedInContainer = document.getElementById("loggedInContainer");
const errorContainer = document.getElementById("errorContainer");

window.addEventListener('DOMContentLoaded', async (e) => {
    masthead.classList.remove('hidden');

    try {
        const res = await fetch(`http://localhost:8080/pets`);

        if (res.status === 401) {
            window.location.href = "/log-in";
            return; //redirect to the log-in page
        }
        const { pets } = await res.json();
        const petsContainer = document.querySelector(".card-container");
        let petsHtml = [];
        pets.forEach((pet, i) => {
            if (i < 12) {
                const { id, petName, age, breedId, photo } = pet;
                const petHtml = `
                <div class="card" id="pet-${id}">
                    <div class="card-image">
                        <img src=${photo}>
                    </div>
                    <div class="card-info">
                        <p class="pet-name">${petName}</p>
                        <div class="pet-age">
                            <p>Age</p>
                            <p> ${convertAge(age)} </p>
                        </div>
                        <div class="pet-breed">
                            <p>Breed</p>
                            <p>${pet.Breed.breedName}</p>
                        </div>
                    </div>
                </div>
            `
                petsHtml.push(petHtml);
            }
        })
        petsContainer.innerHTML = petsHtml.join("");
    } catch (err) {
        console.error(err);
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
