import { convertAge, matchPets } from './utils.js';

const masthead = document.querySelector('.masthead');
const errorContainer = document.getElementById('errorContainer');
const profileContainer = document.querySelector('.profile-left');
const matchLink = document.getElementById('matches');
const requestsLink = document.getElementById('requests');
const editPetPref = document.getElementById('editPetPref');


const userId = localStorage.getItem('PAWS_AND_CLAWS_CURRENT_USER_ID');

window.addEventListener('DOMContentLoaded', async (e) => {
    // Add authorization functionality
    // We should be able to only access the 
    profileContainer.innerHTML = `<div class="pet-card-container"></div>`;
    let response = await fetch(`http://localhost:8080/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
                "PAWS_AND_CLAWS_ACCESS_TOKEN"
            )}`,
        }
    });
    const { user } = await response.json();

    const userFullName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');
    const userPhone = document.getElementById('user-phoneNum');

    userFullName.innerHTML = `${user.firstName} ${user.lastName}`;
    userEmail.innerHTML = `${user.email}`;

    if (user.phoneNum) {
        userPhone.innerHTML = `${user.phoneNum}`
    }

    // Default to Matches
    try {
        const res = await fetch(`http://localhost:8080/pets`);
        const { pets } = await res.json();

        const res2 = await fetch(`http://localhost:8080/preferredPets/${userId}`);
        const { petPref } = await res2.json();

        const matches = matchPets(pets, petPref);

        let petsContainer = document.querySelector('.pet-card-container');
        let petsHtml = [];

        matches.forEach((match, i) => {
            const { id, petName, age, breedId, photo } = match;
            const petHtml = `
                <div class='card' id='pet-${id}'>
                    <div class='card-image'>
                        <img src=${photo}>
                    </div>
                    <div class='card-info'>
                        <p class='pet-name'>${petName}</p>
                        <div class='pet-age'>
                            <p>Age</p>
                            <p> ${convertAge(age)} </p>
                        </div>
                        <div class='pet-breed'>
                            <p>Breed</p>
                            <p>${match.Breed.breedName}</p>
                        </div>
                    </div>
                </div>
            `
            petsHtml.push(petHtml);
        })
        petsContainer.innerHTML = petsHtml.join('');
        matchLink.classList.add('selected');
        requestsLink.classList.remove('selected');
        editPetPref.classList.remove('selected');
    } catch (err) {
        console.error(err);
    }
});
// Matches
matchLink.addEventListener('click', async (event) => {
    profileContainer.innerHTML = `<div class="pet-card-container"></div>`;
    try {
        const res = await fetch(`http://localhost:8080/pets`);
        const { pets } = await res.json();

        const res2 = await fetch(`http://localhost:8080/preferredPets/${userId}`);
        const { petPref } = await res2.json();

        const matches = matchPets(pets, petPref);

        const petsContainer = document.querySelector('.pet-card-container');
        let petsHtml = [];

        matches.forEach((match, i) => {
            const { id, petName, age, breedId, photo } = match;
            const petHtml = `
                <div class='card' id='pet-${id}'>
                    <div class='card-image'>
                        <img src=${photo}>
                    </div>
                    <div class='card-info'>
                        <p class='pet-name'>${petName}</p>
                        <div class='pet-age'>
                            <p>Age</p>
                            <p> ${convertAge(age)} </p>
                        </div>
                        <div class='pet-breed'>
                            <p>Breed</p>
                            <p>${match.Breed.breedName}</p>
                        </div>
                    </div>
                </div>
            `
            petsHtml.push(petHtml);
        })
        petsContainer.innerHTML = petsHtml.join('');
        matchLink.classList.add('selected');
        requestsLink.classList.remove('selected');
        editPetPref.classList.remove('selected');
    } catch (err) {
        console.error(err);
    }
});

// Adoption Requests
requestsLink.addEventListener('click', async (event) => {
    profileContainer.innerHTML = `<div class="adoption-requests-container"></div>`;
    const adoptReqContainer = document.querySelector('.adoption-requests-container');
    try {
        const res = await fetch(`http://localhost:8080/adoptionRequests/user/${userId}`, {
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
                                    <td>${adoptReq.ShelterUser.shelterName}</td>
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
                            <th>Shelter</th>
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

editPetPref.addEventListener('click', async (event) => {
    profileContainer.innerHTML = '';
})
