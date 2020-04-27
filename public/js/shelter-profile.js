import { handleErrors, api } from './utils.js';
import { handlePetCardClick, displayShelterPets } from './petCardHelperFunctions.js';

const profileContainer = document.querySelector('.profile-left');
const addPet = document.getElementById('addPet');
const adoptReq = document.getElementById('adoptReq');
const petList = document.getElementById('petList');

const shelterId = localStorage.getItem('PAWS_AND_CLAWS_CURRENT_USER_ID');

if (localStorage.getItem("PAWS_AND_CLAWS_ROLE") !== "Shelter") {
    window.location.href = "/login"
}

window.addEventListener('DOMContentLoaded', async (e) => {
    let response = await fetch(`${api}shelters/${shelterId}`, {
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
    // Default to show available pets
    profileContainer.innerHTML = `<div class="pet-card-container"></div>`;
    try {
        await displayShelterPets(shelterId);
        petList.classList.add('selected');
        addPet.classList.remove('selected');
        adoptReq.classList.remove('selected');
    } catch (err) {
        handlePetCardClick(err);
    }

    handlePetCardClick();
});
//available pets
petList.addEventListener('click', async (e) => {
    profileContainer.innerHTML = `<div class="pet-card-container"></div>`;
    try {
        await displayShelterPets(shelterId);
        petList.classList.add('selected');
        addPet.classList.remove('selected');
        adoptReq.classList.remove('selected');
    } catch (err) {
        handlePetCardClick(err);
    }

    handlePetCardClick();
});

addPet.addEventListener('click', async (e) => {
    profileContainer.innerHTML = `<div class="add-pet-container"></div>`
    const addPetContainer = document.querySelector('.add-pet-container');

    try {
        const resBreeds = await fetch(`${api}breeds`, {
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
                    <input type="checkbox" id="isOkayKids" name="isOkayKids" />
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
        petList.classList.remove('selected');
        addPet.classList.add('selected');
        adoptReq.classList.remove('selected');
    } catch (e) {
        handleErrors(e);
    }
    const form = document.querySelector('.create-pet')
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const breedId = formData.get("breeds");
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
            const res = await fetch(`${api}pets/`, {
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
        const res = await fetch(`${api}adoptionRequests/shelter/${shelterId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem(
                    "PAWS_AND_CLAWS_ACCESS_TOKEN"
                )}`,
            }
        });

        const { adoptionRequests } = await res.json();

        let adoptReqHTMLArr = [];
        adoptionRequests.forEach(adoptReq => {
            const adoptReqHTML = `
                    <tr>
                        <td>${adoptReq.Pet.petName}</td>
                        <td>${adoptReq.User.firstName} ${adoptReq.User.lastName}</td>
                        <td>${adoptReq.User.email}</td>
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
                            <th>Adopter Email</th>
                            <th>Message</th>
                            <th>Date Sent</th>
                        </tr>
                        ${adoptReqs}
                </table>
            </div>
        `;
        petList.classList.remove('selected');
        addPet.classList.remove('selected');
        adoptReq.classList.add('selected');
    } catch (e) {
        handleErrors(e);
    }
});