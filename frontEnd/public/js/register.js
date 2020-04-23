import { handleErrors } from "./utils.js";

const registerFormUser = document.querySelector(".register-user");
const registerFormShelter = document.querySelector(".register-shelter");
const masthead = document.querySelector(".masthead");
const errorContainer = document.getElementById("errorContainer");


registerFormUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerFormUser);
    const username = formData.get("username");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phoneNum = formData.get("phoneNumber");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword")
    const body = { username, firstName, lastName, email, phoneNum, password, confirmPassword };

    try {
        console.log(body);

        const res = await fetch("http://localhost:8080/users", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw res;
        }
        const {
            token,
            role,
            user: { id },
        } = await res.json();
        // storage access_token in localStorage:
        localStorage.setItem("PAWS_AND_CLAWS_ACCESS_TOKEN", token);
        localStorage.setItem("PAWS_AND_CLAWS_CURRENT_USER_ID", id);
        localStorage.setItem("PAWS_AND_CLAWS_ROLE", role);
        // redirect to home page to see all tweets:
        window.location.href = "/createPreferredPet";
    } catch (err) {
        masthead.classList.remove('hidden');
        errorContainer.classList.remove('hidden');
        // registerContainer.classList.add('hidden');
        // loggedInContainer.classList.add('hidden');
        handleErrors(err);
    }
});

registerFormShelter.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerFormShelter);
    const shelterName = formData.get("shelterName");
    const email = formData.get("email");
    const website = formData.get("website");
    const phoneNum = formData.get("phoneNumber");
    const address = formData.get("address");
    const city = formData.get("city");
    const stateId = formData.get("state");
    const zipCode = formData.get("zipCode");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword")
    const body = { shelterName, email, website, phoneNum, address, city, stateId, zipCode, password, confirmPassword };

    try {
        const res = await fetch("http://localhost:8080/shelters", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw res;
        }
        const {
            token,
            role,
            user: { id },
        } = await res.json();
        // storage access_token in localStorage:
        localStorage.setItem("PAWS_AND_CLAWS_ACCESS_TOKEN", token);
        localStorage.setItem("PAWS_AND_CLAWS_CURRENT_USER_ID", id);
        localStorage.setItem("PAWS_AND_CLAWS_ROLE", role);
        // redirect to home page to see all tweets:
        window.location.href = "/createPet";
    } catch (err) {
        masthead.classList.remove('hidden');
        errorContainer.classList.remove('hidden');
        handleErrors(err);
    }
});
