import { handleErrors, api } from "./utils.js";
import { handleLogin } from "./loginHelperFunction.js"

const logInFormUser = document.querySelector(".user-login");
const logInFormShelter = document.querySelector(".shelter-login");

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

