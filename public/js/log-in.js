import { handleErrors, api } from "./utils.js";

const logInFormUser = document.querySelector(".user-login");
const logInFormShelter = document.querySelector(".shelter-login");

export const handleLogin = async (body, authorization) => {
    try {
        const res = await fetch(`${api}${authorization}s/token`, {
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
            name,
        } = await res.json();
        // storage access_token in localStorage:
        localStorage.setItem("PAWS_AND_CLAWS_ACCESS_TOKEN", token);
        localStorage.setItem("PAWS_AND_CLAWS_CURRENT_USER_ID", id);
        localStorage.setItem("PAWS_AND_CLAWS_ROLE", role);
        localStorage.setItem("PAWS_AND_CLAWS_NAME", name);

        window.location.href = `/${authorization}-profile`;
    } catch (err) {
        handleErrors(err);
    }
}

logInFormUser.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(logInFormUser);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    handleLogin(body, 'user');
});

logInFormShelter.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(logInFormShelter);
    const email = formData.get("email");
    const password = formData.get("password");
    const body = { email, password };
    handleLogin(body, 'shelter');
});

document.getElementById('user-demo-button').addEventListener('click', (e) => {
    e.preventDefault();
    let body = { email: "Demo@DemoUser.com", password: "password" };
    handleLogin(body, 'user');
});

document.getElementById('shelter-demo-button').addEventListener('click', (e) => {
    e.preventDefault();
    let body = { email: "Demo1@DemoShelterUser.com", password: "password" };
    handleLogin(body, 'shelter');
});


