import { breedSort, handleErrors, convertAge, matchPets } from "./utils.js";

const masthead = document.querySelector(".masthead");
const errorContainer = document.getElementById("errorContainer");
const profileContainer = document.querySelector('.profile-left');
const addPet = document.getElementById('addPet');
const adoptReq = document.getElementById('adoptReq');
const petList = document.getElementById('petList');

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

petList.addEventListener('click', async (e) => {
    e.preventDefault();
    profileContainer.innerHTML = `<div class="pet-card-container"></div>`;
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

        const sortedBreeds = breedSort(breeds);

        let breedHTMLArr = [];
        sortedBreeds.forEach(breed => {
            const breedHTML = `
                <option class="breed" value=${breed.id}>${breed.breedName}</option>
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
            <div class="text-container">
                <input type="text" name="petName" id="petName" placeholder="Pet Name" />
            </div>
            <div class="form-breed-age">
                <select class="dropdown" name="breeds" id="breeds" required="required" placeholder="breed">
                    <option value="">Breed</option>
                    ${breedOptions}
                </select>
                <select class="dropdown" name="age" id="age" placeholder="Age">
                    <option value="">Age</option>
                    <option value="1">Puppy (0-1)</option>
                    <option value="2">Young (1-3)</option>
                    <option value="3">Middle Aged (3-7)</option>
                    <option value="4">Adult (7-10)</option>
                    <option value="5">Mature (10+)</option>
                </select>
            </div>
            <div class="form-sex-size">
                <select class="dropdown"name="sex" id="sex" placeholder="Sex">
                    <option value="">Sex</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                </select>
                <select class="dropdown"name="size" id="size" placeholder="Sex">
                    <option value="">Size</option>
                    <option value="1">Toy</option>
                    <option value="2">Small</option>
                    <option value="3">Medium</option>
                    <option value="4">Large</option>
                    <option value="5">X-Large</option>
                </select>
            </div>
            <div class="form-textarea">
                <textarea class="describe-pet" id="description" name="description" placeholder="Describe The Pet"></textarea>
            </div>
            <div class="form-image-input">
                 <label for="photo">Add an image:</label>
                 <input name="photo" type="text" id="photo" placeholder="photo url" />
            </div>
            <div class="form-checkbox">
                <label class="checkbox-label">
                    Is the pet ok with children?
                    <input type="checkbox" id="idOkayKids" name="isOkayKids" />
                    <span class="custom-checkbox"></span>
                </label>
            </div>
            <div class="form-checkbox">
                <label class="checkbox-label">
                    Is the pet ok with other pets?
                    <input type="checkbox" name="isOkayPets" id="isOkayPets"/>
                    <span class="custom-checkbox"></span>
                </label>
            </div>
            <div class="form-submit-button">
                <button class="button" type="submit">Add Pet</button></form>
            </div>
        `
        adoptReq.classList.remove('selected');
        addPet.classList.add('selected');
    } catch (e) {
        console.log(e);
    }
    const form = document.querySelector('.create-pet')
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
            handleErrors(err);
        }
    });
})

adoptReq.addEventListener('click', async (event) => {
    profileContainer.innerHTML = `<div class="adoption-requests-container"></div>`;
    const adoptReqContainer = document.querySelector('.adoption-requests-container');
    try {
        const res = await fetch(`http://localhost:8080/adoptionRequests/shelter/${shelterId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                    "PAWS_AND_CLAWS_ACCESS_TOKEN"
                )}`,
            }
        });
        console.log(res);

        const { adoptionRequests } = await res.json();

        console.log(adoptionRequests)

        let adoptReqHTMLArr = [];
        adoptionRequests.forEach(adoptReq => {
            const adoptReqHTML = `
                    <tr>
                        <td>${adoptReq.Pet.petName}</td>
                        <td>${adoptReq.User.firstName} ${adoptReq.User.lastName}</td>
                        <td class="message">${adoptReq.message}</td>
                        <td class="date">${adoptReq.createdAt}</td>
                    </tr>
                `
            adoptReqHTMLArr.push(adoptReqHTML);
        })
        let adoptReqs = adoptReqHTMLArr.join('')
        adoptReqContainer.innerHTML = `
            <div class="adoption-requests-container">
                <table class="requests-table">
                    <thead>
                        <tr>
                            <th>Pet</th>
                            <th>Adopter</th>
                            <th>Message</th>
                            <th>Date Sent</th>
                        </tr>
                        ${adoptReqs}
                </table>
            </div>
        `;
        matchLink.classList.remove('selected');
        requestsLink.classList.add('selected');
        editPetPref.classList.remove('selected');
    } catch (e) {
        console.log(e);
    }
});