import { convertAge } from "./utils.js";

export const petCardBuilder = (pets) => {
  const petsContainer = document.querySelector(".card-container");
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
  })
  petsContainer.innerHTML = petsHtml.join("");
}