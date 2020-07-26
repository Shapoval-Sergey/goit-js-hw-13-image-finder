const apiKey = '12880088-5f1634c62e30865f461701c2f';

export default {
  searchQuery: '',
  page: 1,
  fetchItems() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${apiKey}`;
    const options = {
      headers: { Authorization: apiKey },
    };

    return fetch(url, options)
      .then(res => res.json())
      .then(data => {
        this.incrementPage();
        return data;
      });
  },
  resetPage() {
    this.page = 1;
  },
  incrementPage() {
    this.page += 1;
  },
  get query() {
    return this.searchQuery;
  },
  set query(value) {
    this.searchQuery = value;
  },
};
