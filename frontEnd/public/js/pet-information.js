import { handleErrors, convertAge, convertSex, convertSize, convertBoolean } from "./utils.js";

const noUserInfo = document.getElementById("pet-page-noUser")
const adopterInfo = document.getElementById("pet-page-adopter")
const shelterInfo = document.getElementById("pet-page-shelter")

const adoptionRequest = document.querySelector(".adoption-request");

const tokenId = localStorage.getItem("PAWS_AND_CLAWS_CURRENT_USER_ID");
const tokenRole = localStorage.getItem("PAWS_AND_CLAWS_ROLE");


const checkAuth = (role, id, pet) => {
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
        <div class="pet-name"></div>
        <h3 id="pet-name">${pet.petName}</h3>
        </div>
        <div>
        <p id="pet-breed">${pet.Breed.breedName}</p>
        </div>
        <div>
        <p id="pet-sex">${convertSex(pet.sex)}</p>
        </div>
        <div>
        <p id="pet-size">${convertSize(pet.size)}</p>
        </div>
        <div>
        <p id="pet-age">${convertAge(pet.age)}</p>
        </div>
        <div>
        <p id="pet-isOkayKids">Is the pet okay with children: ${convertBoolean(pet.isOkayKids)}</p>
        <div>
        </div>
        <p id="pet-isOkayPets">Is the pet okay with other pets: ${convertBoolean(pet.isOkayPets)}</p>
        </div>
        <div>
        <p id="pet-description">${pet.description}</p>
        </div>
    `;

  const petImg = document.querySelector('.pet-image');
  petImg.innerHTML = `
        <img class="full-ph src="${pet.photo}">
    `;

  adoptionRequest.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(adoptionRequest);
    const message = formData.get("adoption-message");
    const body = {
      userId: parseInt(tokenId, 10),
      petId: pet.id,
      shelterId: pet.shelterId,
      message,
      isAccepted: false,
    };

    try {
      const res = await fetch("http://localhost:8080/adoptionRequests", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(
            "PAWS_AND_CLAWS_ACCESS_TOKEN"
          )}`,
        }
      });

      if (!res.ok) {
        throw res;
      }
      window.location.href = "/user-profile";

    } catch (err) {
      handleErrors(err);
    };
  });
});

document.getElementById("edit-pet-link").addEventListener("click", async (e) => {
  e.preventDefault();
  const pathParts = window.location.pathname.split('/');
  const petNum = parseInt(pathParts[2], 10);
  window.location.href = `/edit-pet/${petNum}`
})
