export function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/`;
  const filter = `fields=name,capital,population,flags,languages`;
  return fetch(`${URL}${name}?${filter}`);
}
