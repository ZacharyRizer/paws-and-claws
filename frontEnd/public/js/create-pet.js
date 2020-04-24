import { handleErrors } from "./utils.js";

const petForm = document.querySelector(".create-pet");
const masthead = document.querySelector(".masthead");
const errorContainer = document.getElementById("errorContainer");


if (localStorage.getItem("PAWS_AND_CLAWS_ROLE") !== "Shelter") {
    window.location.href = "/login"
}

petForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(petForm);
    const breedId = formData.get("breeds");
    // const shelterId = localStorage.getItem("PAWS_AND_CLAWS_CURRENT_USER_ID");
    const petName = formData.get("petName");
    const age = formData.get("age");
    const sex = formData.get("sex");
    const size = formData.get("size");
    const description = formData.get("description");
    const photo = formData.get("photo");
    const isOkayKids = formData.get("isOkayKids") ? true : false
    const isOkayPets = formData.get("isOkayPets") ? true : false

    const body = {
        breedId,
        petName,
        age,
        sex,
        size,
        description,
        photo,
        isOkayKids,
        isOkayPets,
    };

    try {
        const res = await fetch(`http://localhost:8080/pets/`, {
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
        window.location.href = "/shelter-profile";
    } catch (err) {
        masthead.classList.remove('hidden');
        errorContainer.classList.remove('hidden');
        handleErrors(err);
    }
});
