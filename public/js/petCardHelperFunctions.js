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

export const displayMatches = async(userId) => {
    try {
        const res = await fetch(`${api}pets`);
        const { pets } = await res.json();

        const res2 = await fetch(`${api}preferredPets/${userId}`);
        const { petPref } = await res2.json();

        if (res2.status === 404) {
            window.location.href = '/create-preferred-pet';
        }

        const matches = matchPets(pets, petPref);

        const petsContainer = document.querySelector('.pet-card-container');
        const petsHtml = petCardBuilder(matches);
        petsContainer.innerHTML = petsHtml.join('');

        matchLink.classList.add('selected');
        requestsLink.classList.remove('selected');
        editPetPref.classList.remove('selected');
    } catch (err) {
        handleErrors(err);
    }
};