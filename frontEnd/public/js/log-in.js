import { handleErrors } from "./utils.js";

const logInFormUser = document.querySelector(".log-in-form-user");
const logInFormShelter = document.querySelector(".log-in-form-shelter");

logInFormUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(logInFormUser);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    try {
        const res = await fetch(`http://localhost:8080/user/token`, {
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
        window.location.href = "/";
    } catch (err) {
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
        const res = await fetch(`http://localhost:8080/shelter/token`, {
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
        window.location.href = "/";
    } catch (err) {
        handleErrors(err);
    }
});