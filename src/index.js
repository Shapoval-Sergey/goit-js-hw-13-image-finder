import appService from './js/apiService';
import updateImagesMarkup from './js/update-images-markup';
import refs from './js/refs';
// import './js/notifications';
import './styles.css';

function searchFormSubmitHandler(event) {
  event.preventDefault();

  const form = event.currentTarget;
  appService.query = form.elements.query.value;
  clearArticlesContainer();
  appService.resetPage();
  fetchItems();
  form.reset();
}

function fetchItems() {
  // loadMoreBtn.disable();

  appService.fetchItems().then(data => {
    updateImagesMarkup(data);
    // loadMoreBtn.show();
    // loadMoreBtn.enable();
  });
}

function clearArticlesContainer() {
  refs.list.innerHTML = '';
}

refs.form.addEventListener('submit', searchFormSubmitHandler);
