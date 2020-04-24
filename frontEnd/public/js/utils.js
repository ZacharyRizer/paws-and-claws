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

export const matchPets = (dogs, prefPet) => {
    dogs.forEach(dog => {
        let count = 0
        for (let key in prefPet) {
            if (prefPet[key] === dog[key]) {
                count++
            }
        }
        dog.matchPercentage = count / 6;
    })

    const bestMatches = dogs.filter(dog => {
        return (dog.matchPercentage > 0.5);
    });

    // Quick sort the matches -Sea
    const bestMatchesSorted = array => {
        if (array.length <= 1) {
            return array;
        }
    
        let pivot = array.shift();
        let pivotVal = pivot.matchPercentage;
        let left = array.filter(dog => dog.matchPercentage > pivotVal);
        let right = array.filter(dog => dog.matchPercentage <= pivotVal);
    
        let leftSorted = bestMatchesSorted(left);
        let rightSorted = bestMatchesSorted(right);
    
        return [ ...leftSorted, pivot, ...rightSorted ];
    }
    
    return bestMatchesSorted(bestMatches);
}
