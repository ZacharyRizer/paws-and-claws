import { handleErrors } from "./utils.js";

const petForm = document.querySelector(".pet-form");

petForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (localStorage.getItem("PAWS_AND_CLAWS_ROLE") !== "Shelter") {
        //TODO: Error handling
    }

    const formData = new FormData(petForm);
    const breedId = formData.get("breedId");
    //const shelterId = formData.get("shelterId");
    const userId = localStorage.getItem("PAWS_AND_CLAWS_CURRENT_USER_ID");
    const petName = formData.get("petName");
    const age = formData.get("age");
    const sex = formData.get("sex");
    const size = formData.get("size");
    const description = formData.get("description");
    const photo = formData.get("photo");
    const isOkayKids = formData.get("isOkayKids");
    const isOkayPets = formData.get("isOkayPets");
    const isAdopted = formData.get("isAdopted");

    const body = {
        breedId,
        userId,
        petName,
        age,
        sex,
        size,
        description,
        isOkayKids,
        isOkayPets,
        isAdopted
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
            window.location.href = "/login"; //redirect to profile page
            return;
        }
        if (!res.ok) {
            throw res;
        }
        window.location.href = "/"; //redirect to profile page
    } catch (err) {
        handleErrors(err);
    }
});