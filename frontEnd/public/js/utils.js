export const handleErrors = async err => {
	document.querySelector(".logged-in-container").classList.add("hidden");
	document.querySelector(".register-container").classList.add("hidden");
	document.querySelector(".masthead").classList.remove("hidden");
	document.querySelector(".error-container").classList.remove("hidden");
	document.getElementById("slides").classList.add("hidden");

	if (err.status >= 400 && err.status < 600) {
		const errorJSON = await err.json();
		const errorList = document.querySelector(".error-list");
		let errorsHtml = [
			`
        <li class="">
            Something went wrong. Please try again.
        </li>
      `
		];
		const { errors } = errorJSON;
		if (errors && Array.isArray(errors)) {
			errorsHtml = errors.map(
				message => `
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

export const convertAge = ageIndex => {
	if (ageIndex === 1) return "Puppy (0-1)";
	if (ageIndex === 2) return "Young (1-3)";
	if (ageIndex === 3) return "Middle Aged (3-7)";
	if (ageIndex === 4) return "Adult (7-10)";
	if (ageIndex === 5) return "Mature (10+)";
};

export const convertSex = sexIndex => {
	if (sexIndex === 1) return "Male";
	if (sexIndex === 2) return "Female";
};

export const convertSize = sizeIndex => {
	if (sizeIndex === 1) return "Toy";
	if (sizeIndex === 2) return "Small";
	if (sizeIndex === 3) return "Medium";
	if (sizeIndex === 4) return "Large";
	if (sizeIndex === 5) return "X-Large";
};

export const convertBoolean = boolean => {
	if (true) return "Yes";
	if (!true) return "No";
};

export const matchPets = (dogs, prefPet) => {
	dogs.forEach(dog => {
		let count = 0;
		for (let key in prefPet) {
			if (
				prefPet[key] === dog[key] ||
				(key === "breedId" && prefPet.breedId === null)
			) {
				count++;
			}
		}
		dog.matchPercentage = count / 6;
	});

	const bestMatches = dogs.filter(dog => {
		return dog.matchPercentage > 0.5;
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

		return [...leftSorted, pivot, ...rightSorted];
	};

	return bestMatchesSorted(bestMatches);
};

export const breedSort = breedArr => {
	breedArr.sort((petOne, petTwo) => {
		return petOne.breedName.localeCompare(petTwo.breedName) > 0;
	});
	return breedArr;
};
