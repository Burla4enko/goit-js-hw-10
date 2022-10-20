import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from ('lodash.debounce');
import { fetchCountries } from './js/fetchCountries';
import countryListTmpl from "./templates/countryList.hbs";
import countryInfoTmpl from "./templates/countryInfo.hbs";

const DEBOUNCE_DELAY = 300;
