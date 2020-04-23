import { handleErrors } from "./utils.js";

const logInFormUser = document.querySelector(".user-login");
const logInFormShelter = document.querySelector(".shelter-login");
const masthead = document.querySelector(".masthead");
const registerContainer = document.getElementById("registerContainer");
const loggedInContainer = document.getElementById("loggedInContainer");
const errorContainer = document.getElementById("errorContainer");

logInFormUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(logInFormUser);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    console.log(body)
    try {
        const res = await fetch(`http://localhost:8080/users/token`, {
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
        window.location.href = "/";
    } catch (err) {
        masthead.classList.remove('hidden');
        errorContainer.classList.remove('hidden');
        // registerContainer.classList.add('hidden');
        // loggedInContainer.classList.add('hidden');
        handleErrors(err);
    }
});
logInFormShelter.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(logInFormShelter);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    try {
        const res = await fetch(`http://localhost:8080/shelters/token`, {
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
        window.location.href = "/";
    } catch (err) {
        masthead.classList.remove('hidden');
        errorContainer.classList.remove('hidden');
        // registerContainer.classList.add('hidden');
        // loggedInContainer.classList.add('hidden');
        handleErrors(err);
    }
});