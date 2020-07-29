import appService from './js/apiService';
import updateImagesMarkup from './js/update-images-markup';
import refs from './js/refs';
import LoadMoreBtn from './js/load-more-button';
import successMessage from './js/notifications';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/src/styles/main.scss';
import './styles.css';

const loadMoreBtn = new LoadMoreBtn({
  selector: 'button[data-action="load-more"]',
  hidden: true,
});

loadMoreBtn.refs.button.addEventListener('click', fetchItems);

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
  loadMoreBtn.disable();

  appService.fetchItems().then(data => {
    updateImagesMarkup(data);
    if (data.length < 12) {
      loadMoreBtn.hide();
    } else {
      loadMoreBtn.show();
      loadMoreBtn.enable();
      successMessage();
    }
    function modalImageHandler(event) {
      let modalImage = null;
      data.map(obj => {
        if (event.target.src === obj.webformatURL) {
          modalImage = obj.largeImageURL;
          const instance = basicLightbox.create(
            `<img src="${modalImage}" width="800" height="600">`,
          );
          instance.show();
        }
      });
    }

    refs.list.addEventListener('click', modalImageHandler);
    window.scrollTo({
      top: document.documentElement.offsetHeight,
      behavior: 'smooth',
    });
  });
}

function clearArticlesContainer() {
  refs.list.innerHTML = '';
}

refs.form.addEventListener('submit', searchFormSubmitHandler);

// console.log(basicLightbox); currentSrc
