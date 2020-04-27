import { handleErrors, convertAge, convertSex, convertSize, api } from "./utils.js";

const masthead = document.querySelector(".masthead");
const registerContainer = document.getElementById("registerContainer");
const loggedInContainer = document.getElementById("loggedInContainer");
const errorContainer = document.getElementById("errorContainer");
const slider = document.querySelector(".slider");
const carouselLeft = document.getElementById("carouselNavLeft")
const carouselRight = document.getElementById("carouselNavRight")




window.addEventListener('DOMContentLoaded', async (e) => {

    let currentPic = 1;

    carouselRight.addEventListener('click', async (e) => {
        if (currentPic === 10) {
            currentPic = 1;
        } else {
            currentPic++;
        }
        carouselRight.href = `#slide-${currentPic}`;
        setTimeout((() => { window.scrollTo(0, 0) }), 1);
    });

    carouselLeft.addEventListener('click', e => {
        if (currentPic === 1) {
            currentPic = 10;
        } else {
            currentPic--;
        }
        carouselLeft.href = `#slide-${currentPic}`;
        setTimeout((() => { window.scrollTo(0, 0) }), 1);
    });

    masthead.classList.remove('hidden');
    try {
        const res = await fetch(`${api}pets`);

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
                            <p class="breed-name">${pet.Breed.breedName}</p>
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
