import { handleErrors, api } from './utils.js';
import {
  petCardBuilder,
  handlePetCardClick,
} from './petCardHelperFunctions.js';

const masthead = document.querySelector('.masthead');
const carouselLeft = document.getElementById('carouselNavLeft');
const carouselRight = document.getElementById('carouselNavRight');

window.addEventListener('DOMContentLoaded', async (e) => {
  let currentPic = 1;

  carouselRight.addEventListener('click', async (e) => {
    if (currentPic === 10) {
      currentPic = 1;
    } else {
      currentPic++;
    }
    carouselRight.href = `#slide-${currentPic}`;
  });

  carouselLeft.addEventListener('click', (e) => {
    if (currentPic === 1) {
      currentPic = 10;
    } else {
      currentPic--;
    }
    carouselLeft.href = `#slide-${currentPic}`;
  });

  masthead.classList.remove('hidden');
  try {
    const res = await fetch(`${api}pets`);

    if (res.status === 401) {
      window.location.href = '/log-in';
      return; //redirect to the log-in page
    }
    const { pets } = await res.json();

    const petsContainer = document.querySelector('.card-container');
    const petsHtml = petCardBuilder(pets);
    petsContainer.innerHTML = petsHtml;
  } catch (err) {
    handleErrors(err);
  }

  handlePetCardClick();
});
