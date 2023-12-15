import axios from 'axios';

const pixabay_key = '41241875-626c3239215a842e842cb8043';

function fetchAPI(el, page, perPage) {
  return axios.get(
    `https://pixabay.com/api/?key=${pixabay_key}&q=${el}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`
  );
}

export { fetchAPI };
