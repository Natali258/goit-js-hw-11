import { fetchAPI } from './requests';
import { createGallery } from './create_gallery';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.search-form');
const getGallery = document.querySelector('.gallery');
const btnLoader = document.querySelector('.load-more');
let inputValue;
let page;
const perPage = 40;

const getInput = async event => {
  event.preventDefault();
  page = 1;
  inputValue = event.target[0].value;
  getGallery.innerHTML = '';
  btnLoader.classList.add('is-hidden');

  if (inputValue === '') {
    Notify.warning('Please, fill the main field');
    return;
  }
  buildGallery(inputValue, page);
};

async function buildGallery(inputValue, page) {
  const result = await fetchAPI(inputValue, page);
  const res = result.data.hits;
  if (res.length === 0) {
    getGallery.innerHTML = '';
    Notify.warning(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }
  const totalPages = Math.ceil(result.data.totalHits / perPage);
  if (page < totalPages) {
    btnLoader.classList.remove('is-hidden');
  }

  const galleryPage = createGallery(res);
  getGallery.insertAdjacentHTML('beforeend', galleryPage);
}

const loadMoreCards = async elem => {
  page += 1;
  const result = await fetchAPI(inputValue, page);
  const res = result.data.hits;
  const totalPages = Math.ceil(result.data.totalHits / perPage);
  if (page === totalPages) {
    Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
    btnLoader.classList.add('is-hidden');
  }

  const galleryPage = createGallery(res);
  getGallery.insertAdjacentHTML('beforeend', galleryPage);
};
form.addEventListener('submit', getInput);
btnLoader.addEventListener('click', loadMoreCards);
