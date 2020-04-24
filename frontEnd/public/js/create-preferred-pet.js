import { handleErrors } from "./utils.js";

const petPrefForm = document.querySelector(".create-pref-pet");

if (localStorage.getItem("PAWS_AND_CLAWS_ROLE") !== "Adopter") {
    window.location.href = "/login"
}

petPrefForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(petPrefForm);
    const breedId = formData.get("breeds");
    const userId = localStorage.getItem("PAWS_AND_CLAWS_CURRENT_USER_ID");
    const age = formData.get("age");
    const sex = formData.get("sex");
    const size = formData.get("size");
    const isOkayKids = formData.get("isOkayKids") ? true : false;
    const isOkayPets = formData.get("isOkayPets") ? true : false;

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
        window.location.href = "/user-profile"; //redirect to matches
    } catch (err) {
        handleErrors(err);
    }
});
