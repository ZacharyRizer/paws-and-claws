import { handleErrors } from "./utils.js";

const petPrefForm = document.querySelector(".");

petPrefForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (localStorage.getItem("PAWS_AND_CLAWS_ROLE") !== "Adopter") {
        //TODO: Error handling
    }

    const formData = new FormData(petPrefForm);
    const breedId = formData.get("breed");
    const userId = localStorage.getItem("PAWS_AND_CLAWS_CURRENT_USER_ID");
    const age = formData.get("age");
    const sex = formData.get("sex");
    const size = formData.get("size");
    const isOkayKids = formData.get("isOkayKids");
    const isOkayPets = formData.get("isOkayPets");

    const body = {
        breedId,
        userId,
        age,
        sex,
        size,
        isOkayKids,
        isOkayPets
    };

    try {
        const res = await fetch(`http://localhost:8080/preferredPets/`, {
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
        window.location.href = "/"; //redirect to matches
    } catch (err) {
        handleErrors(err);
    }
});