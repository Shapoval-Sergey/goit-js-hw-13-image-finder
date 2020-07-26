import country from '../templates/gallery-country.hbs';
import arrCountries from '../templates/list-countries.hbs';
import refs from './refs';
import errorMessage from './notifications';

function updateCountriesMarkup(data) {
  if (data.length > 10) {
    errorMessage();
    return;
  }

  let markup;
  if (data.length === 1) {
    markup = country(data);
  }
  if (data.length >= 2 && data.length <= 10) {
    markup = arrCountries(data);
  }

  refs.list.insertAdjacentHTML('beforeend', markup);
}

export default updateCountriesMarkup;
