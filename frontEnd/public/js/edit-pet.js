import { handleErrors } from "./utils.js";

// Fix this tomorrow | PUT request and autofill with info

const petForm = document.querySelector(".edit-pet");
const masthead = document.querySelector(".masthead");
const errorContainer = document.getElementById("errorContainer");


if (localStorage.getItem("PAWS_AND_CLAWS_ROLE") !== "Shelter") {
    window.location.href = "/login"
}

window.addEventListener("DOMContentLoaded", async (e) => {
    try {
        const pathParts = window.location.pathname.split('/');
        const petNum = parseInt(pathParts[2], 10);

        const petInfo = await fetch(`http://localhost:8080/pets/${petNum}`);
        const { pet } = await petInfo.json();

        const namePlaceHolder = document.getElementById('petName');
        const breedPlaceHolder = document.getElementById('breeds');
        const agePlaceHolder = document.getElementById('age');
        const sexPlaceHolder = document.getElementById('sex');
        const sizePlaceHolder = document.getElementById('size')
        const descriptionPlaceHolder = document.getElementById('description');
        const photoURLPlaceHolder = document.getElementById('photo');
        const isOkayKidsPlaceHolder = document.getElementById('isOkayKids');
        const isOkayPetsPlaceHolder = document.getElementById('isOkayPets');

        namePlaceHolder.setAttribute('placeholder', `${pet.petName}`)
        breedPlaceHolder.setAttribute('placeholder', `${pet.Breed.breedName}`)
        agePlaceHolder.setAttribute('placeholder', `${pet.age}`)
        sexPlaceHolder.setAttribute('placeholder', `${pet.sex}`)
        sizePlaceHolder.setAttribute('placeholder', `${pet.size}`)
        descriptionPlaceHolder.setAttribute('placeholder', `${pet.description}`)
        photoURLPlaceHolder.setAttribute('placeholder', `${pet.photo}`)

    } catch (err) {
        masthead.classList.remove('hidden');
        errorContainer.classList.remove('hidden');
        handleErrors(err);
    }
})

petForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(petForm);
    const breedId = formData.get("breeds");
    // const shelterId = localStorage.getItem("PAWS_AND_CLAWS_CURRENT_USER_ID");
    const petName = formData.get("petName");
    const age = formData.get("age");
    const sex = formData.get("sex");
    const size = formData.get("size");
    const description = formData.get("description");
    const photo = formData.get("photo");
    const isOkayKids = formData.get("isOkayKids") ? true : false
    const isOkayPets = formData.get("isOkayPets") ? true : false

    const body = {
        breedId,
        petName,
        age,
        sex,
        size,
        description,
        photo,
        isOkayKids,
        isOkayPets,
    };

    try {
        const res = await fetch(`http://localhost:8080/pets/`, {
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
