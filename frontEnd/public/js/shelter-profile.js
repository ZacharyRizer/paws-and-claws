import { convertAge, matchPets } from "./utils.js";

const masthead = document.querySelector(".masthead");
const errorContainer = document.getElementById("errorContainer");
const profileContainer = document.querySelector('.profile-left');
const matchLink = document.getElementById('matches');
const requestsLink = document.getElementById('requests');
const editPetPref = document.getElementById('editPetPref');

profileContainer.innerHTML = `<div class="pet-card-container"></div>`;
const shelterId = localStorage.getItem('PAWS_AND_CLAWS_CURRENT_USER_ID');

window.addEventListener('DOMContentLoaded', async (e) => {
    // Add authorization functionality
    // We should be able to only access the 

    let response = await fetch(`http://localhost:8080/shelters/${shelterId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
                "PAWS_AND_CLAWS_ACCESS_TOKEN"
            )}`,
        }
    });
    const { shelterUser } = await response.json();
    console.log(shelterUser);


    const shelterName = document.getElementById('shelter-name');
    const shelterPhone = document.getElementById('shelter-phoneNum');
    const shelterEmail = document.getElementById('shelter-email');
    const shelterWebsite = document.getElementById('shelter-website');
    const shelterAddress = document.getElementById('shelter-address');
    const shelterAddressLine2 = document.getElementById('shelter-address-2');

    shelterName.innerHTML = `${shelterUser.shelterName}`;
    shelterPhone.innerHTML = `${shelterUser.phoneNum}`;
    shelterEmail.innerHTML = `${shelterUser.email}`;
    shelterWebsite.innerHTML = `${shelterUser.website}`;
    shelterAddress.innerHTML = `${shelterUser.address}`;
    shelterAddressLine2.innerHTML = `${shelterUser.city}, ${shelterUser.State.stateName} ${shelterUser.zipCode}`;
    // Default To Matches
    try {
        const res = await fetch(`http://localhost:8080/pets`);
        const { pets } = await res.json();

        const availablePets = pets.filter(pet => {
            if (pet.shelterId === parseInt(shelterId, 10)) {
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