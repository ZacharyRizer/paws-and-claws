import { handleErrors } from "./utils.js";

const registerFormUser = document.querySelector(".sign-up-form");
const registerFormShelter = document.querySelector(".sign-up-form");

registerFormUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerFormUser);
    const username = formData.get("username");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phoneNum = formData.get("phoneNum");
    const password = formData.get("password");
    const body = { username, firstName, lastName, email, phoneNum, password };
    try {
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
            user: { id },
        } = await res.json();
        // storage access_token in localStorage:
        localStorage.setItem("PAWS_AND_CLAWS_ACCESS_TOKEN", token);
        localStorage.setItem("PAWS_AND_CLAWS_CURRENT_USER_ID", id);
        // redirect to home page to see all tweets:
        window.location.href = "/create-dream-pet";
    } catch (err) {
        handleErrors(err);
    }
});

registerFormShelter.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(registerFormShelter);
    const username = formData.get("username");
    const name = formData.get("name");
    const email = formData.get("email");
    const phoneNum = formData.get("phoneNum");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const zipCode = formData.get("zipCode");
    const body = { username, name, email, phoneNum, address, city, state, zipCode, password };
    try {
        const res = await fetch("http://localhost:8080/shelter", {
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
            user: { id },
        } = await res.json();
        // storage access_token in localStorage:
        localStorage.setItem("PAWS_AND_CLAWS_ACCESS_TOKEN", token);
        localStorage.setItem("PAWS_AND_CLAWS_CURRENT_USER_ID", id);
        // redirect to home page to see all tweets:
        window.location.href = "/create-pet";
    } catch (err) {
        handleErrors(err);
    }
});