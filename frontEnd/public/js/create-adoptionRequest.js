
import { handleErrors } from "./utils.js";

const adoptionRequestFormUser = document.querySelector(".adoption-request-adopter");
//const adoptionRequestFormShelter = document.querySelector(".adoption-request-shelter");
const petId = document.getElementById("petId");
const shelterId = document.getElementById("shelterId");
const userId = document.getElementById("userId");
const message = document.getElementById("message");
const isAccepted = document.getElementById("isAccepted");

adoptionRequestFormUser.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(adoptionRequestFormUser);
    // const petId = formData.get("petId");
    // const userId = localStorage.getItem("PAWS_AND_CLAWS_CURRENT_USER_ID");
    // const shelterId = formData.get("shelterId");
    const message = formData.get("message");

    const body = {
        petId,
        userId,
        shelterId,
        message
    };

    try {
        const res = await fetch(`http://localhost:8080/adoptionRequests`, {
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
            window.location.href = "/";
            return;
        }
        if (!res.ok) {
            throw res;
        }
        window.location.href = "//adoptionRequests"; //redirect to adoption request
    } catch (err) {
        handleErrors(err);
    }
});