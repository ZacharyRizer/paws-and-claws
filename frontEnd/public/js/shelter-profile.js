import { convertAge, matchPets } from "./utils.js";

const masthead = document.querySelector(".masthead");
const errorContainer = document.getElementById("errorContainer");

window.addEventListener('DOMContentLoaded', async (e) => {

    const shelterUserId = parseInt(localStorage.getItem("PAWS_AND_CLAWS_CURRENT_USER_ID"), 10);
    try {
        const res = await fetch(`http://localhost:8080/pets`);
        const { pets } = await res.json();

        const availablePets = pets.filter(pet => {
            if (pet.shelterId === shelterUserId) {
                return pet;
            };
        });

        const petsContainer = document.querySelector(".pet-card-container");
        let petsHtml = [];

        availablePets.forEach((pet, i) => {
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
        })
        petsContainer.innerHTML = petsHtml.join("");
    } catch (err) {
        console.error(err);
    }
});