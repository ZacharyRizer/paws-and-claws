import { convertAge, handleErrors, api, matchPets } from "./utils.js";

export const petCardBuilder = (pets) => {
    let petsHtml = [];
    pets.forEach((pet, i) => {
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
    });
    return petsHtml.join("");
};

export const displayMatches = async (userId) => {
    const res = await fetch(`${api}pets`);
    const { pets } = await res.json();
    const res2 = await fetch(`${api}preferredPets/${userId}`);
    const { petPref } = await res2.json();
    if (res2.status === 404) {
        window.location.href = '/createPreferredPet';
    }
    const matches = matchPets(pets, petPref);
    let petsContainer = document.querySelector('.pet-card-container');
    let petsHtml = petCardBuilder(matches);
    petsContainer.innerHTML = petsHtml
};

export const handlePetCardClick = () => {
    const petCards = document.querySelectorAll('.card');

    petCards.forEach(petCard => petCard.addEventListener('click', async (e) => {
        let clickTarget = e.target.parentNode;

        while (!clickTarget.id) {
            clickTarget = clickTarget.parentNode;
        }

        const petNum = parseInt(clickTarget.id.split('-')[1], 10);
        window.location.href = `/pets/${petNum}`;
    }));
}