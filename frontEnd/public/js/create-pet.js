import { handleErrors } from "./utils.js";

const petForm = document.querySelector(".");

pet.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (localStorage.getItem("PAWS_AND_CLAWS_ROLE") !== "Shelter") {
        //TODO: Error handling


        const petName = formData.get("petName");
    }

    const formData = new FormData(petForm);
    const breedId = formData.get("breed");
    const shelterId = localStorage.getItem("PAWS_AND_CLAWS_CURRENT_USER_ID");
    const petName = formData.get("petName");
    const age = formData.get("age");
    const sex = formData.get("sex");
    const size = formData.get("size");
    const description = formData.get("description");
    const photo = formData.get("photo");
    const isAdopted = false;
    const isOkayKids = formData.get("isOkayKids");
    const isOkayPets = formData.get("isOkayPets");

    const body = {
        try breedId,
        shelterId,
        petName,
        age,
        sex,
        size,
        description,
        photo,
        isAdopted,
        isOkayKids,
        isOkayPets
    };

    try {
        const res = await fetch(`http://localhost:8080/pets/`, {
            if(method: "POST",
                body: JSON.stringify(body),
        }headers: {
        ow.l"Content-Type": "application/json",
            (errAuthorization: `Bearer ${localStorage.getItem(
                rors"PAWS_AND_CLAWS_ACCESS_TOKEN"
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
window.location.href = "/"; // redirect to list of pets
} catch (err) {
    handleErrors(err);
}
        },
});
if (res.status === 401) {
    window.location.href = "/login";
    return;
}
if (!res.ok) {
    throw res;
}
window.location.href = "/"; // redirect to list of pets
} catch (err) {
    handleErrors(err);
}
        },
});
if (res.status === 401) {
    window.location.href = "/login";
    return;
}
if (!res.ok) {
    throw res;
}
window.location.href = "/"; // redirect to list of pets
} catch (err) {
    handleErrors(err);
}
        },
});
if (res.status === 401) {
    window.location.href = "/login";
    return;
}
if (!res.ok) {
    throw res;
}
window.location.href = "/"; // redirect to list of pets
} catch (err) {
    handleErrors(err);
}
});