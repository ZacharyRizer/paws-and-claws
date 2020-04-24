import { handleErrors, convertAge, convertSex, convertSize, convertBoolean } from "./utils.js";

const noUserInfo = document.getElementById("pet-page-noUser")
const adopterInfo = document.getElementById("pet-page-adopter")
const shelterInfo = document.getElementById("pet-page-shelter")

const tokenId = localStorage.getItem("PAWS_AND_CLAWS_CURRENT_USER_ID");
const tokenRole = localStorage.getItem("PAWS_AND_CLAWS_ROLE");


const checkAuth = (role, id, pet) => {
  console.log(role)
  console.log(tokenRole)
  if (role) {
    if (role === "Adopter") {
      adopterInfo.classList.remove("hidden");
    } else if (role === "Shelter") {
      if (id == pet.shelterId) {

        shelterInfo.classList.remove("hidden");
      }
    }
  } else {
    noUserInfo.classList.remove("hidden");
  }
}

window.addEventListener('DOMContentLoaded', async (e) => {

  const pathParts = window.location.pathname.split('/');
  const petNum = parseInt(pathParts[2], 10);

  const petInfo = await fetch(`http://localhost:8080/pets/${petNum}`);
  const { pet } = await petInfo.json();

  const petInfoContainer = document.querySelector('.info-container');

  checkAuth(tokenRole, tokenId, pet);

  petInfoContainer.innerHTML = `
        <h3 id="pet-name">${pet.petName}</h3>
        <p id="pet-breed">${pet.Breed.breedName}</p>
        <p id="pet-sex">${convertSex(pet.sex)}</p>
        <p id="pet-size">${convertSize(pet.size)}</p>
        <p id="pet-age">${convertAge(pet.age)}</p>
        <p id="pet-isOkayKids">Is the pet okay with children: ${convertBoolean(pet.isOkayKids)}</p>
        <p id="pet-isOkayPets">Is the pet okay with other pets: ${convertBoolean(pet.isOkayPets)}</p>
        <p id="pet-description">${pet.description}</p>
    `;

  const petImg = document.querySelector('.pet-image');
  petImg.innerHTML = `
        <img src="${pet.photo}">
    `;
});