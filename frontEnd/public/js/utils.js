export const handleErrors = async (err) => {
    if (err.status >= 400 && err.status < 600) {
        const errorJSON = await err.json();
        const errorList = document.querySelector(".error-list");
        let errorsHtml = [
            `
        <li class="">
            Something went wrong. Please try again.
        </li>
      `,
        ];
        const { errors } = errorJSON;
        if (errors && Array.isArray(errors)) {
            errorsHtml = errors.map(
                (message) => `
          <li class="">
              ${message}
          </li>
        `
            );
        }
        errorList.innerHTML = errorsHtml.join("");
    } else {
        alert(
            "Something went wrong. Please check your internet connection and try again!"
        );
    }
};

export const convertAge = (ageIndex) => {
    if (ageIndex === 1) return "Puppy"
    if (ageIndex === 2) return "Young"
    if (ageIndex === 3) return "Middle Aged"
    if (ageIndex === 4) return "Adult"
    if (ageIndex === 5) return "Mature"
};
