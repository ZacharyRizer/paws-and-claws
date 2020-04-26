import { convertAge, api } from "./utils.js";

const masthead = document.querySelector(".masthead");
const registerContainer = document.getElementById("registerContainer");
const loggedInContainer = document.getElementById("loggedInContainer");
const errorContainer = document.getElementById("errorContainer");

window.addEventListener('DOMContentLoaded', async (e) => {
    masthead.classList.remove('hidden');
    registerContainer.classList.remove('hidden');

    //   const userId = localStorage.getItem("TWITTER_LITE_CURRENT_USER_ID");
    try {
        const res = await fetch(`${api}/pets`);

        if (res.status === 401) {
            window.location.href = "/log-in";
            return; //redirect to the log-in page
        }
        const { pets } = await res.json();
        console.log(pets)
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
});