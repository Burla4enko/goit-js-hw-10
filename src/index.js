import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import { fetchCountries } from './js/fetchCountries';
import countryListTmpl from './templates/country-list.hbs';
import countryInfoTmpl from './templates/country-info.hbs';

const DEBOUNCE_DELAY = 300;
countryListTmpl();

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryListUl: document.querySelector('.country-list'),
  countryInfoDiv: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch() {
  cleanSearch();

  const name = this.value.trim();

  if (!name) {
    return;
  }

  fetchCountries(name)
    .then(response => {
      if (response.status === 404) {
        throw new Error('Oops, there is no country with that name');
      }
      return response.json();
    })
    .then(response => {
      switch (true) {
        case response.length === 1:
          countryInfoMarkup(response[0]);
          // countryInfoTmpl(response[0]);
          break;

        case response.length <= 10:
          countryListMarkup(response);
          // countryListTmpl(response);
          break;

        case response.length > 10:
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
      }
    })
    .catch(error => Notiflix.Notify.failure(error.message));
}

function cleanSearch() {
  refs.countryListUl.innerHTML = '';
  refs.countryInfoDiv.innerHTML = '';
}

function countryListMarkup(countries) {
  refs.countryListUl.innerHTML = countryListTmpl(countries);
}

function countryInfoMarkup(country) {
  country.languageList = Object.values(country.languages).join(', ');
  refs.countryInfoDiv.innerHTML = countryInfoTmpl(country);
}
