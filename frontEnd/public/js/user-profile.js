import { convertAge, matchPets } from './utils.js';

const masthead = document.querySelector('.masthead');
const errorContainer = document.getElementById('errorContainer');
const profileContainer = document.querySelector('.profile-left');
const matchLink = document.getElementById('matches');
const requestsLink = document.getElementById('requests');
const editPetPref = document.getElementById('editPetPref');

window.addEventListener('DOMContentLoaded', async (e) => {
    profileContainer.innerHTML = `<div class="pet-card-container"></div>`;
    const userId = localStorage.getItem('PAWS_AND_CLAWS_CURRENT_USER_ID');

    // Default to Matches
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

    // Matches
    matchLink.addEventListener('click', async (event) => {
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
            const res = await fetch(`http://localhost:8080/adoptionRequests/user/${userId}`);
            const { adoptionRequests } = res.json();

            let adoptReqHTMLArr = [];
            adoptionRequests.forEach(adoptReq => {
                const adoptReqHTML = `
                    <div class="adoption-requests-container">
                        <table class="requests-table">
                            <thead>
                                <tr>
                                    <th>Pet</th>
                                    <th>Shelter</th>
                                </tr>

                        </table>
                    </div>
                `
                adoptReqHTMLArr.push(adoptReqHTML);
            })
            adoptReqContainer.innerHTML = adoptReqHTMLArr.join('')
            matchLink.classList.remove('selected');
            requestsLink.classList.add('selected');
            editPetPref.classList.remove('selected');
        } catch (e) {
            console.log(e);
        }

    });
});

