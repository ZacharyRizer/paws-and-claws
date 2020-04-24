import { convertAge, matchPets } from "./utils.js";

const masthead = document.querySelector(".masthead");
const errorContainer = document.getElementById("errorContainer");
const profileContainer = document.querySelector('.profile-left');
const matchLink = document.getElementById('matches');
const requestsLink = document.getElementById('requests');
const addPet = document.getElementById('addPet');

profileContainer.innerHTML = `<div class="pet-card-container"></div>`;
const shelterId = localStorage.getItem('PAWS_AND_CLAWS_CURRENT_USER_ID');

if (localStorage.getItem("PAWS_AND_CLAWS_ROLE") !== "Shelter") {
    window.location.href = "/login"
}

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

addPet.addEventListener('click', async (e) => {
    profileContainer.innerHTML = `<div class="add-pet-container"></div>`
    const addPetContainer = document.querySelector('.add-pet-container');

    try {
        const resBreeds = await fetch("http://localhost:8080/breeds", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                    "PAWS_AND_CLAWS_ACCESS_TOKEN"
                )}`,
            }
        });
        const { breeds } = await resBreeds.json();

        let breedHTMLArr = [];
        breeds.forEach(breed => {
            const breedHTML = `
                <option class="breed">${breed.breedName}</option>
            `
            breedHTMLArr.push(breedHTML);
        });
        let breedOptions = breedHTMLArr.join('');

        addPetContainer.innerHTML = `
        <form class="create-pet">
            <div class="create-pet-header">
                <h1>Add a pet to the adoption list</h1>
                <p>Let's find the pets at your shelter a good Home!</p>
            </div>
            <div class="form-element">
                <label for="petName">Pet Name:</label>
                <input type="text" name="petName" id="petName" placeholder="Pet Name" /></div>
            <div class="form-element">
                <label for="breeds">Breed:</label>
                <select name="breeds" id="breeds" required="required">
                    ${breedOptions}
                </select>
            </div>
            <div class="form-element">
                <label for="age">Age:</label>
                <select name="age" id="age" placeholder="Age">
                    <option value="1">Puppy (0-1)</option>
                    <option value="2">Young (1-3)</option>
                    <option value="3">Middle Aged (3-7)</option>
                    <option value="4">Adult (7-10)</option>
                    <option value="5">Mature (10+)</option>
                </select>
            </div>
            <div class="form-element">
                <label for="sex">Sex:</label>
                <select name="sex" id="sex" placeholder="Sex">
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>
            </div>
            <div class="form-element">
                <label for="size">Size:</label>
                <select name="size" id="size" placeholder="Sex">
                    <option value="1">Toy</option>
                    <option value="2">Small</option>
                    <option value="3">Medium</option>
                    <option value="4">Large</option>
                    <option value="5">X-Large</option>
                </select>
            </div>
            <div class="form-element">
                <label for="description">Describe the pet:</label>
                <textarea id="description" name="description" placeholder="Describe The Pet"></textarea>
            </div>
            <div class="form-element">
                 <label for="photo">Add an image of the pet:</label>
                 <input name="photo" type="text" id="photo" placeholder="photo url" />
            </div>
            <div class="form-element">
                <label for="isOkayKids">Is the pet ok with children?</label>
                <input type="checkbox" id="idOkayKids" name="isOkayKids" />
            </div>
            <div class="form-element">
                <label for="isOkayPets">Is the pet ok with other pets?</label>
                <input type="checkbox" name="isOkayPets" id="isOkayPets" />
            </div>
            <div class="form-element"></div>
                <button class="button" type="submit">Add Pet</button></form>
        </div>
        `
        matchLink.classList.remove('selected');
        requestsLink.classList.remove('selected');
        editPetPref.classList.add('selected');
    } catch (e) {
        console.log(e);
    }
    const form = document.querySelector('.add-pet-form')
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
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
                method: "POST",
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
})