import { handleErrors, api } from "./utils.js";


const petForm = document.querySelector(".edit-pet");
const masthead = document.querySelector(".masthead");
const errorContainer = document.getElementById("errorContainer");

let petId; // given a value on line 21

if (localStorage.getItem("PAWS_AND_CLAWS_ROLE") !== "Shelter") {
    window.location.href = "/login"
}

window.addEventListener("DOMContentLoaded", async (e) => {
    try {
        const pathParts = window.location.pathname.split('/');
        const petNum = parseInt(pathParts[2], 10);
        const petInfo = await fetch(`${api}pets/${petNum}`);
        const { pet } = await petInfo.json();
        petId = pet.id

        const nameInput = document.getElementById('petName');
        const breedInput = document.getElementById('breeds');
        const ageInput = document.getElementById('age');
        const sizeInput = document.getElementById('size')
        const descriptionInput = document.getElementById('description');
        const photoURLInput = document.getElementById('photo');
        const isOkayKidsInput = document.getElementById('isOkayKids');
        const isOkayPetsInput = document.getElementById('isOkayPets');
        const isAdoptedInput = document.getElementById('isAdopted');

        nameInput.value = pet.petName
        breedInput.value = pet.breedId
        ageInput.value = pet.age
        sizeInput.value = pet.size
        descriptionInput.value = pet.description
        photoURLInput.value = pet.photo

        if (pet.isOkayKids === true) {
            isOkayKidsInput.checked = true
        }
        if (pet.isOkayPets === true) {
            isOkayPetsInput.checked = true
        }
        if (pet.isAdopted === true) {
            isAdoptedInput.checked = true
        }

    } catch (err) {
        handleErrors(err);
    }
})

petForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(petForm);
    const breedId = formData.get("breeds");
    const petName = formData.get("petName");
    const age = formData.get("age");
    const size = formData.get("size");
    const description = formData.get("description");
    const photo = formData.get("photo");
    const isOkayKids = formData.get("isOkayKids") ? true : false
    const isOkayPets = formData.get("isOkayPets") ? true : false
    const isAdopted = formData.get("isAdopted") ? true : false

    const body = {
        petId,
        petName,
        breedId,
        age,
        size,
        description,
        photo,
        isOkayKids,
        isOkayPets,
        isAdopted,
    };

    try {
        const res = await fetch(`${api}pets/${petId}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                    "PAWS_AND_CLAWS_ACCESS_TOKEN"
                )}`,
            },
        });
        if (res.status === 401) {
            window.location.href = "/login";
            return;
        }
        if (!res.ok) {
            throw res;
        }
        window.location.href = "/shelter-profile";
    } catch (err) {
        masthead.classList.remove('hidden');
        errorContainer.classList.remove('hidden');
        handleErrors(err);
    }
});
